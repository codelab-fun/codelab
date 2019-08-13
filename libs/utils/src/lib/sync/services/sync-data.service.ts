import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';

@Injectable({
  providedIn: 'root'
})
export class SyncDataService {
  private readonly syncId$ = this.syncSesionService.sessionId$.pipe(filter(a => !!a));

  constructor(
    private readonly syncSesionService: SyncSessionService,
    private readonly dbService: SyncDbService) {
  }

  getPresenterObject<T>(key: string, defaultValue?: T) {
    const key$ = this.syncId$.pipe(
      map((syncId) => `sync-sessions/${syncId}/presenter/${key}`)
    );

    return this.dbService.object(key$, defaultValue);
  }

  getCurrentViewerObject<T>(key: string, defaultValue?: T) {
    const key$ = combineLatest([
      this.syncId$,
      this.syncSesionService.viewerId$.pipe(filter(a => !!a))
    ]).pipe(
      map(([syncId, viewerId]) => {
        return `sync-sessions/${syncId}/viewer/${key}/${viewerId}`;
      })
    );
    return this.dbService.object(key$, defaultValue);
  }

  getViewerObject<T>(key: string, viewerId: string, defaultValue?: T) {
    const key$ = this.syncId$.pipe(
      map((syncId) => `sync-sessions/${syncId}/viewer/${key}/${viewerId}`)
    );

    return this.dbService.object(key$, defaultValue);
  }

  getCurrentViewerList<T>(key: string, defaultValue?: T[]) {
    const key$ = combineLatest([
      this.syncId$,
      this.syncSesionService.viewerId$.pipe(filter(a => !!a))
    ]).pipe(
      map(([syncId, viewerId]) => `sync-sessions/${syncId}/viewer/${key}/${viewerId}`)
    );

    return this.dbService.list(key$, defaultValue);
  }

  getAdminAllUserData<T>(key: string, defaultValue?: T) {
    const key$ = this.syncId$.pipe(
      map((syncId) => `sync-sessions/${syncId}/viewer/${key}`)
    );

    return this.dbService.object(key$, defaultValue);
  }
}
