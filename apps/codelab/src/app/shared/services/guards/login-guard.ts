import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { LoginService } from '@codelab/firebase-login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _route: Router, private loginService: LoginService) {}

  canActivate(
    ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.loginService.isAnonymous$.pipe(
      map(res => {
        if (res) {
          // user is anonymous
          return true;
        }
        // user is logged in, navigate to home
        this._route.navigate(['/']);
        return false;
      })
    );
  }
}
