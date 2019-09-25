import { Injectable } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanActivate
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // todo add here access check
    const isLoggedIn = false;

    /**
     *  If user is an admin already - navigate to the Admin page
     */
    if (isLoggedIn && route.routeConfig.path === 'login') {
      this._route.navigate(['admin']);
    }

    return true;
  }
}
