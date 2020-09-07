import { Injectable } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SyncDb } from '@codelab/utils/src/lib/sync/services/sync-data.service';

export enum Permissions {
  MANAGE_USERS = 'manage_users',
  CAN_LOAD_ADMIN = 'can_load_admin'
}

@Injectable({ providedIn: 'root' })
export class AccessService {
  readonly oldIsAdmin$ = this.loginService.uid$.pipe(
    switchMap(uid => {
      return this.dbService
        .object('authorized_users')
        .object(uid)
        .withDefault(false)
        .valueChanges();
    })
  );

  private readonly adminPermissions = this.dbService
    .object('admin')
    .object(this.loginService.uid$)
    .object('permissions');

  constructor(
    private readonly loginService: LoginService,
    private readonly dbService: SyncDbService<SyncDb>
  ) {}

  can(p: Permissions): Observable<boolean> {
    return (
      this.adminPermissions
        // TODO(kirjs): default: false
        .object(p)
        .valueChanges()
        .pipe(filter(a => a !== null))
    );
  }
}
