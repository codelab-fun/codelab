import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AccessService, Permissions } from '../access.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

  constructor(
    private _route: Router,
    private accessService: AccessService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // todo add here access check
    const isLoggedIn = true;

    /**
     * User is not logged in and tries to load admin components =>
     * Wow-wow, what's is here? Tricky user? =>
     * He should be navigated to the login component
     */
    if (!isLoggedIn && route.routeConfig.path === 'admin') {
      this._route.navigate(['login']);
    }

    return true;
  }
}
