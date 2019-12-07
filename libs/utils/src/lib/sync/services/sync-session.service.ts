import { Injectable } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import {
  firebaseToValuesWithKey,
  SyncStatus
} from '@codelab/utils/src/lib/sync/common';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import produce from 'immer';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  filter,
  first,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import {
  SyncDb,
  SyncSession
} from '@codelab/utils/src/lib/sync/services/sync-data.service';

@Injectable({
  providedIn: 'root'
})
export class SyncSessionService {
  readonly status$: Observable<SyncStatus>;
  readonly viewerId$: Observable<string> = this.loginService.uid$;
  readonly canStartSession$ = this.viewerId$.pipe(
    tap(a => {
      console.log({ a });
    }),
    switchMap((uid: string) => {
      return this.dbService
        .object('authorized_users')
        .object(uid)
        .withDefault(false)
        .valueChanges();
    }),
    shareReplay(1)
  );

  private readonly sessionId = new BehaviorSubject<string>(null);
  readonly sessionConfig = this.dbService
    .object('sync-sessions')
    .object(this.sessionId)
    .object('config');

  readonly sessionId$ = this.sessionId.asObservable();
  readonly hasActiveSession$ = this.sessionId.pipe(
    map(sessionId => !!sessionId),
    shareReplay(1)
  );
  private readonly preferredAdminStatusSubject = new BehaviorSubject(null);
  private readonly preferredAdminStatus$ = combineLatest([
    this.loginService.preferredStatus$,
    this.preferredAdminStatusSubject.asObservable()
  ]).pipe(map(([a, b]) => b || a));
  private readonly sessions = this.dbService.objectList('sync-sessions');
  readonly sessions$ = this.sessions.snapshots$.pipe(
    map(firebaseToValuesWithKey)
  );

  constructor(
    private readonly dbService: SyncDbService<SyncDb>,
    private loginService: LoginService
  ) {
    this.status$ = combineLatest([
      this.viewerId$,
      this.sessionConfig.valueChanges(),
      this.preferredAdminStatus$
    ]).pipe(
      map(([uid, config, preferredAdminStatus]) => {
        if (!(config && config.active)) {
          return SyncStatus.OFF;
        }
        if (config.owner === uid || config.admins.includes(uid)) {
          return preferredAdminStatus || SyncStatus.ADMIN;
        }

        return SyncStatus.VIEWING;
      }),
      tap(a => console.log(a)),
      shareReplay(1)
    );
  }

  create(name: string) {
    const uid = this.loginService.uid$.pipe(first());
    uid
      .pipe(
        map(uid => {
          // TODO(kirjs): Figure this out
          const session: Partial<SyncSession> = {
            config: {
              owner: uid,
              active: true,
              admins: ['admin'],
              autojoin: true,
              name: name
            }
          };
          return session;
        })
      )
      .subscribe(session => this.sessions.push(session as SyncSession));
    this.autoJoin(name);
  }

  autoJoin(name: string) {
    const sessions = this.sessions.snapshots$.pipe(
      filter(s => !!s),
      takeUntil(this.hasActiveSession$.pipe(filter(a => a)))
    );

    const availableSessions = sessions.pipe(
      map(sessions =>
        sessions.filter(snapshot => {
          const config = snapshot.payload.val().config;
          return config.autojoin && config.active && config.name === name;
        })
      )
    );

    availableSessions.subscribe(a => {
      if (a.length > 1) {
        console.log(
          'cannot autojoin as there are more than one active sessions'
        );
        return;
      }

      if (a.length === 1) {
        this.sessionId.next(a[0].key);
      }
    });
  }

  dropCurrentSession() {
    this.sessionConfig.object('active').set(false);
  }

  remove(key: string) {
    this.sessions.object(key).remove();
  }

  flipActive(key: string) {
    this.sessions.object(key).updateWithCallback(
      produce(s => {
        s.config.active = !s.config.active;
      })
    );
  }

  present() {
    this.preferredAdminStatusSubject.next(SyncStatus.PRESENTING);
  }

  administer() {
    this.preferredAdminStatusSubject.next(SyncStatus.ADMIN);
  }
}
