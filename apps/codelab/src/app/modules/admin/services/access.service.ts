import { Injectable } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


export enum Permissions {
  MANAGE_USERS = 'manage_users'
}

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  readonly oldIsAdmin$ = this.loginService.uid$
    .pipe(
      switchMap(uid => {
        return this.dbService.object(of('authorized_users/' + uid), false)
          .valueChanges();
      }),
    );


  private readonly adminPermissions = this.dbService.object<any>('admin')
    .object(this.loginService.uid$, {permissions: {}})
    .object('permissions');

  constructor(
    private readonly loginService: LoginService,
    private readonly dbService: SyncDbService,
  ) {
  }

  can(p: Permissions) {
    return this.adminPermissions.object(p, false).valueChanges().pipe(filter(a => a !== null));
  }
}
