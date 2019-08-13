import { Injectable } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, first, map, share, switchMap, takeUntil } from 'rxjs/operators';
import { SyncSession, SyncSessionConfig, SyncStatus, toValuesWithKey } from '@codelab/utils/src/lib/sync/common';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import produce from 'immer';

@Injectable({
  providedIn: 'root'
})
export class SyncSessionService {
  readonly status$: Observable<SyncStatus>;
  readonly viewerId$ = this.loginService.uid$;
  readonly canStartSession$ = this.viewerId$
    .pipe(
      share(),
      switchMap(uid => this.dbService.object(of('authorized_users/' + uid), false).valueChanges()),
    );

  private readonly sessionId = new BehaviorSubject(null);
  readonly sessionConfig = this.dbService.object<SyncSessionConfig>(
    this.sessionId.pipe(map(sessionId => sessionId ? `sync-sessions/${sessionId}/config` : null))
  );
  readonly sessionId$ = this.sessionId.asObservable();
  readonly hasActiveSession$ = this.sessionId.pipe(map(sessionId => !!sessionId));
  private readonly preferredAdminStatusSubject = new BehaviorSubject(null);
  private readonly preferredAdminStatus$ = combineLatest([
    this.loginService.preferredStatus$,
    this.preferredAdminStatusSubject.asObservable()
  ]).pipe(map(([a, b]) => b || a));
  private readonly sessions = this.dbService.list<SyncSession>(of('sync-sessions'));
  readonly sessions$ = this.sessions.snapshots$.pipe(map(toValuesWithKey));

  constructor(
    private readonly dbService: SyncDbService,
    private loginService: LoginService
  ) {
    this.status$ = combineLatest(
      [
        this.viewerId$,
        this.sessionConfig.valueChanges(),
        this.preferredAdminStatus$,
      ]
    ).pipe(map(([uid, config, preferredAdminStatus]) => {
      if (config === null || !config.active) {
        return SyncStatus.OFF;
      }
      if (config.owner === uid || config.admins.includes(uid)) {
        return preferredAdminStatus || SyncStatus.ADMIN;
      }

      return SyncStatus.VIEWING;
    }));
  }

  create() {
    this.loginService.uid$.pipe(first()).subscribe(uid => {
      const session: SyncSession = {
        config: {
          owner: uid,
          active: true,
          admins: ['admin'],
          autojoin: true
        }
      };

      this.sessions.push(session);
    });
    this.autoJoin();
  }

  autoJoin() {
    this.sessions.snapshots$.pipe(
      filter(s => !!s),
      takeUntil(this.hasActiveSession$.pipe(filter(a => a))),
      map((sessions) => sessions.filter((snapshot) => {
        const config = snapshot.payload.val().config;
        return config.autojoin && config.active;
      })))
      .subscribe(a => {
        if (a.length > 1) {
          console.log('cannot autojoin as there are more than one active sessions');
          return;
        }

        if (a.length === 1) {
          this.sessionId.next(a[0].key);
        }
      });
  }

  dropCurrentSession() {
    this.sessionConfig.object('active').set(false);
    this.sessionId.next(null);
  }

  remove(key: string) {
    this.sessions.object(key).remove();
  }

  flipActive(key: string) {
    this.sessions.object<SyncSessionConfig>(key).updateWithCallback(produce(s => {
      s.config.active = !s.config.active;
    }));
  }

  present() {
    this.preferredAdminStatusSubject.next(SyncStatus.PRESENTING);
  }

  administer() {
    this.preferredAdminStatusSubject.next(SyncStatus.ADMIN);
  }
}
