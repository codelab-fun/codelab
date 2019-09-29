import { Injectable } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import {
  firebaseToValuesWithKey,
  SyncSession,
  SyncSessionConfig,
  SyncStatus
} from '@codelab/utils/src/lib/sync/common';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import produce from 'immer';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SyncSessionService {
  readonly status$: Observable<SyncStatus>;
  readonly viewerId$ = this.loginService.uid$;
  readonly canStartSession$ = this.viewerId$.pipe(
    switchMap(uid => {
      return this.dbService
        .object(of('authorized_users/' + uid), false)
        .valueChanges();
    })
  );

  private readonly sessionId = new BehaviorSubject(null);
  readonly sessionConfig = this.dbService.object<SyncSessionConfig>(
    this.sessionId.pipe(
      map(sessionId =>  (sessionId ? `sync-sessions/${sessionId}/config` : null))
    )
  );
  readonly sessionId$ = this.sessionId.asObservable();
  readonly hasActiveSession$ = this.sessionId.pipe(
    map(sessionId => !!sessionId)
  );
  private readonly preferredAdminStatusSubject = new BehaviorSubject(null);
  private readonly preferredAdminStatus$ = combineLatest([
    this.loginService.preferredStatus$,
    this.preferredAdminStatusSubject.asObservable()
  ]).pipe(map(([a, b]) => b || a));
  private readonly sessions = this.dbService.list<SyncSession>(
    of('sync-sessions')
  );
  readonly sessions$ = this.sessions.snapshots$.pipe(
    map(firebaseToValuesWithKey)
  );

  constructor(
    private readonly dbService: SyncDbService,
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
      })
    );
  }

  create(name: string) {
    const uid = this.loginService.uid$.pipe(first());
    uid
      .pipe(
        map(uid => {
          const session: SyncSession = {
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
      .subscribe(session => this.sessions.push(session));
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
    this.sessions.object<SyncSessionConfig>(key).updateWithCallback(
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
