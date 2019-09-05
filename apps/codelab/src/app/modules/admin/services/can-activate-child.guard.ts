import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { AccessService, Permissions } from '../../../../../../../libs/firebase-login/src/lib/access.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateChildGuard implements CanActivateChild {
  constructor(private readonly accessService: AccessService) {
  }

  canActivateChild() {
    this.accessService.can(Permissions.MANAGE_USERS).subscribe(console.log);

    // return this.accessService.can(Permissions.MANAGE_USERS);
    return true;
  }

}
