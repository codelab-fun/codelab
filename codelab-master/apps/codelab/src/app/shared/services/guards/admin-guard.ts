import { Injectable } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessService, Permissions } from '../access.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private _route: Router, private accessService: AccessService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return true;
    return this.accessService.can(Permissions.CAN_LOAD_ADMIN).pipe(
      map(hasAccess => {
        if (!hasAccess) {
          this._route.navigate(['login']);
          return false;
        }

        return true;
      })
    );
  }
}
