import { Injectable } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { filter } from 'rxjs/operators';


export enum Permissions {
  MANAGE_USERS = 'manage_users'
}

export interface AdminConfig {
  permissions: Record<Permissions, boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private readonly adminPermissions = this.dbService.object<any>('admin')
    .object(this.loginService.uid$, {permissions: {}})
    .object('permissions');

  constructor(
    private readonly loginService: LoginService,
    private readonly dbService: SyncDbService,
  ) {
    this.adminPermissions.set({manage_users: true});
  }

  can(p: Permissions) {
    return this.adminPermissions.object(p, false).valueChanges().pipe(filter(a => a !== null));
  }
}
