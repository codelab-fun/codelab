import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginService } from '@codelab/firebase-login';
import { distinctUntilChanged, first, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, forkJoin, iif, Observable, of, ReplaySubject } from 'rxjs';

export enum SyncStatus {
  OFF = 'off',
  VIEWING = 'viewing',
  PRESENTING = 'presenting',
  ADMIN = 'admin',
}

interface SyncMeta<T> {
  time: number;
  uid: string;
  displayName: string;
  presenter: Partial<T>;
  users: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class SyncService<T> {
  currentSyncId$ = new BehaviorSubject('');
  currentViewerId$ = new BehaviorSubject('');
  readonly isInSession$ = this.currentSyncId$.pipe(map(syncId => !!syncId));
  readonly canStartSession$ = combineLatest([this.loginService.uid$, this.currentSyncId$])
    .pipe(map(([uid, syncId]) => {
      return !!uid && syncId === '';
    }));
  readonly currentSession$ = this.currentSyncId$.pipe(
    mergeMap(id =>
      iif(() => !!id, this.db.object<SyncMeta<T>>('sync-sessions/' + id).valueChanges(), of(null))));

  readonly presentersData$ = this.currentSyncId$.pipe(
    mergeMap(id =>
      iif(() => !!id, this.db.object<T>('sync-sessions/' + id + '/presenter').valueChanges(), of(null))));

  readonly statusChange$: Observable<SyncStatus> = this.currentSyncId$.pipe(switchMap(syncId => {
    if (!syncId) {
      return of(SyncStatus.OFF);
    }

    return this.currentSession$.pipe(
      switchMap(session => {
        if (!session) {
          return of(SyncStatus.OFF);
        }

        return this.loginService.uid$.pipe(map((uid) => {
          if (uid === 'admin') {
            return SyncStatus.ADMIN;
          }

          if (session.uid === uid) {
            return SyncStatus.PRESENTING;
          }
          return SyncStatus.VIEWING;
        }));
      })
    );

  }), distinctUntilChanged());


  // combineLatest([this.loginService.uid$, this.currentSyncId$, this.currentSession$])


  readonly hasSessions$;
  private readonly list = this.db.list<Partial<SyncMeta<T>>>('sync-sessions',
    ref => ref.orderByChild('time').startAt(Date.now() - 1000 * 60 * 10)
  );
  sessions$ = this.list.snapshotChanges().pipe(map(snapshot => {
    return snapshot.map(s => {
      return {
        key: s.key,
        ...s.payload.val()
      };
    });
  }));
  private presenterUpdates$ = new ReplaySubject<Partial<T>>(1);
  private viewerUpdates$ = new ReplaySubject<any>(1);


  constructor(
    private db: AngularFireDatabase,
    private loginService: LoginService
  ) {
    combineLatest([this.presenterUpdates$, this.currentSyncId$, this.statusChange$])
      .subscribe(
        ([data, syncId, status]) => {
          // TODO(kirjs): Use rxjs way
          if (syncId && status === SyncStatus.PRESENTING) {
            this.list.update(syncId, {
              time: Date.now()
            });
            this.db.object('sync-sessions/' + syncId + '/presenter').update(data);
          }
        });

    this.viewerUpdates$.subscribe((viewerUpdates) => console.log({viewerUpdates}));
    this.currentSyncId$.subscribe((currentSyncId) => console.log({currentSyncId}));
    this.currentViewerId$.subscribe((currentViewerId) => console.log({currentViewerId}));
    this.presenterUpdates$.subscribe((presenterUpdates) => console.log({presenterUpdates}));


    // Formatter breaks this when it's above constructor by moving it before
    // $sessions declaration on every second format
    this.hasSessions$ = this.sessions$.pipe(map(sessions => sessions.length > 0));


    combineLatest([this.viewerUpdates$, this.currentSyncId$, this.currentViewerId$]).subscribe(
      ([{key, data, type}, syncId, viewerId]) => {
        const update = {[viewerId]: data};
        if (syncId === '') {
          throw new Error('No viewver ID, you might be a presenter');
        }

        if (type === 'update') {
          this.db.object(`sync-sessions/${syncId}/viewer/${key}`).update(update);
        }

        if (type === 'push') {
          this.db.list(`sync-sessions/${syncId}/viewer/${key}`).push(update);
        }
      });


    combineLatest([this.sessions$, this.loginService.uid$]).pipe(first()).subscribe(
      ([sessions, uid]) => {
        // debugger;
        const activeSession = sessions.find((session) => session.uid === uid);
        if (activeSession) {
          this.follow(activeSession.key);
        } else if (sessions.length === 1) {
          this.follow(sessions[0].key);
        }
      }
    );
  }

  startSession(data: T) {
    this.loginService.user$.subscribe(user => {
      const syncId = this.list.push({
        displayName: user.displayName || user.email,
        uid: user.uid,
        presenter: data,
        users: {},
        time: Date.now()
      }).key;
      this.currentSyncId$.next(syncId);
    });
  }

  updateSession(data: T) {
    this.presenterUpdates$.next(data);
  }


  follow(syncId: string) {
    this.currentSyncId$.next(syncId);

    forkJoin([
      this.statusChange$.pipe(first()),
      this.loginService.uid$.pipe(first())
    ]).subscribe(([status, uid]) => {
      if (status === SyncStatus.VIEWING) {

        this.db.list('sync-sessions/' + syncId + '/all-viewers', ref => ref.orderByChild('uid').equalTo(uid))
          .snapshotChanges()
          .pipe(first())
          .subscribe(a => {
            if (a.length > 0) {
              this.currentViewerId$.next(a[0].key);
            } else {
              this.currentViewerId$.next(
                this.db.list('sync-sessions/' + syncId + '/all-viewers').push({
                  time: Date.now(),
                  uid,
                }).key
              );
            }
          });
      }
    });
  }

  getPresenterValue(key: string) {
    return this.currentSyncId$.pipe(switchMap((syncId) => {
      return this.db.object(`sync-sessions/${syncId}/presenter/${key}`).valueChanges();
    }));
  }

  updateViewerValue(key: string, data: any) {
    this.viewerUpdates$.next({key, data, type: 'update'});
  }

  updatePresenterValue(data: Partial<T>) {
    this.presenterUpdates$.next(data);
  }

  getViewerValue(key: string) {
    return combineLatest([this.currentSyncId$, this.currentViewerId$]).pipe(switchMap(([syncId, viewerId]) => {
      return this.db.object(`sync-sessions/${syncId}/viewer/${key}/${viewerId}`).valueChanges();
    }));
  }

  getAllViewersValues(key: string) {
    return this.currentSyncId$.pipe(switchMap((syncId) => {
      return this.db.object(`sync-sessions/${syncId}/viewer/${key}`).valueChanges();
    }));
  }

  leaveCurrentSession() {
    return this.currentSyncId$.pipe(take(1)).subscribe(id => {
      this.currentSyncId$.next('');
    });
  }

  dropCurrentSession() {
    return this.currentSyncId$.pipe(take(1)).subscribe(id => {
      this.currentSyncId$.next('');
      this.list.remove(id);
    });
  }

  pushViewerValue(key: string, data: any) {
    this.viewerUpdates$.next({key, data, type: 'push'});
  }
}
