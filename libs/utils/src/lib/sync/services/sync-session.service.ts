import { Injectable } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, first, map, share, switchMap, takeUntil } from 'rxjs/operators';
import { SyncSession, SyncSessionConfig, SyncStatus } from '@codelab/utils/src/lib/sync/common';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';

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

  private readonly sessions = this.dbService.list<SyncSession>(of('sync-sessions'));

  constructor(
    private readonly dbService: SyncDbService,
    private loginService: LoginService
  ) {
    this.sessionConfig.valueChanges().subscribe(a => {
      console.log(a);
    });


    this.status$ = combineLatest(
      [
        this.viewerId$,
        this.sessionConfig.valueChanges(),
      ]
    ).pipe(map(([uid, config]) => {
      if (config === null || !config.active) {
        return SyncStatus.OFF;
      }
      if (config.owner === uid) {
        return SyncStatus.ADMIN;
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
}
