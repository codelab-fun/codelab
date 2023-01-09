import { Component, OnInit } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import { SyncDbService } from '@codelab/sync';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Permissions } from '../../../shared/services/access.service';
import { firebaseToValuesWithKey } from '@codelab/sync';

export interface AdminDb {
  key: string;
  permissions: Record<Permissions, boolean>;
}

export interface Admin extends AdminDb {
  isCurrentUser: boolean;
}

export interface UserDb {
  admin: AdminDb[];
}

@Component({
  selector: 'codelab-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  readonly displayedColumns = ['isCurrentUser', 'key'];

  readonly admins = this.dbService.list('admin');
  private readonly allAdmins$ = this.admins.snapshots$.pipe(
    map(firebaseToValuesWithKey)
  );

  readonly admins$: Observable<Admin[]> = combineLatest([
    this.allAdmins$,
    this.loginService.uid$,
  ]).pipe(
    map(([admins, currentUserUid]) => {
      return admins.map((admin) => ({
        ...admin,
        isCurrentUser: admin.key === currentUserUid,
      }));
    })
  );

  constructor(
    private readonly loginService: LoginService,
    private readonly dbService: SyncDbService<UserDb>
  ) {}
}
