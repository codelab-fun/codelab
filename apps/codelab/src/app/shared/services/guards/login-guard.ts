import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {

  constructor(
    private _route: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // todo add here access check
    const isLoggedIn = false;

    /**
     *  User is logged in and try to load login component =>
     *  WHY DOES HE NEED IT? =>
     *  He should be navigated to admin component
     */
    if (isLoggedIn && route.routeConfig.path === 'login') {
      this._route.navigate(['admin']);
    }

    /**
     * User is not logged in and try to load login component - sure, let him go
     * User is logged in and try to load admin component - x2sure, let him go
     */
    return true;
  }
}
