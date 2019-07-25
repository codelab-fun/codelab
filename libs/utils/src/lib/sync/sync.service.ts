import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginService } from '@codelab/firebase-login';
import { distinctUntilChanged, filter, first, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, ReplaySubject, Subject } from 'rxjs';

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
  readonly canStartSession$ = combineLatest([this.user.uid$, this.currentSyncId$])
    .pipe(map(([uid, syncId]) => {
      return !!uid && syncId === '';
    }));
  readonly currentSession$ = new Subject<SyncMeta<T>>();
  readonly presentersValue$ = new Subject<T>();
  readonly isPresenting$ = combineLatest([this.currentSession$, this.user.uid$]).pipe(
    map(([{uid}, syncId]) => {
      return uid === syncId;
    }),
    distinctUntilChanged());

  readonly whenPresenting$ = this.isPresenting$.pipe(filter(a => a));
  readonly whenViewing$ = this.isPresenting$.pipe(filter(a => !a));

  readonly isViewing$ = this.isPresenting$.pipe(map(a => !a));

  private list = this.db.list<Partial<SyncMeta<T>>>('sync-sessions',
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
    private user: LoginService
  ) {


    combineLatest([this.presenterUpdates$, this.currentSyncId$, this.whenPresenting$]).subscribe(
      ([data, syncId]) => {
        this.list.update(syncId, {
          time: Date.now()
        });
        this.db.object('sync-sessions/' + syncId + '/presenter').update(data);
      });

    this.viewerUpdates$.subscribe((viewerUpdates) => console.log({viewerUpdates}));
    this.currentSyncId$.subscribe((currentSyncId) => console.log({currentSyncId}));
    this.whenViewing$.subscribe((whenViewing) => console.log({whenViewing}));
    this.currentViewerId$.subscribe((currentViewerId) => console.log({currentViewerId}));


    combineLatest([this.viewerUpdates$, this.currentSyncId$, this.currentViewerId$, this.whenViewing$]).subscribe(
      ([{key, data}, syncId, viewerId]) => {
        const update = {[viewerId]: data};
        this.db.object(`sync-sessions/${syncId}/viewer/${key}`).update(update);
      });


    combineLatest([this.sessions$, this.user.uid$]).pipe(first()).subscribe(
      ([sessions, uid]) => {
        const activeSession = sessions.find((session) => session.uid === uid);
        if (activeSession) {
          this.follow(activeSession.key);
        }
      }
    );
  }


  startSession(data: T) {
    this.user.user$.subscribe(user => {
      this.currentSyncId$.next(this.list.push({
        displayName: user.displayName || user.email,
        uid: user.uid,
        presenter: data,
        users: {},
        time: Date.now()
      }).key);
    });
  }

  updateSession(data: T) {
    this.presenterUpdates$.next(data);
  }


  follow(syncId: string) {
    this.currentSyncId$.next(syncId);
    this.db.object('sync-sessions/' + syncId).valueChanges().subscribe(this.currentSession$);
    this.db.object('sync-sessions/' + syncId + '/presenter').valueChanges().subscribe(this.presentersValue$);

    this.whenViewing$.pipe(first()).subscribe(() => {
      this.currentViewerId$.next(
        this.db.list('sync-sessions/' + syncId + '/all-viewers').push({time: Date.now()}).key
      );
    });
  }

  getPresenterValue(key: string) {
    return this.currentSyncId$.pipe(switchMap((syncId) => {
      return this.db.object(`sync-sessions/${syncId}/presenter/${key}`).valueChanges();
    }));
  }

  updateViewerValue(key: string, data: any) {
    this.viewerUpdates$.next({key, data});
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
}
