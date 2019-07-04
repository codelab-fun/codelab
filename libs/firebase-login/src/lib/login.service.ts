import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly user$ = this.auth.user;
  readonly uid$ = this.user$.pipe(map(user => user && user.uid));

  constructor(private auth: AngularFireAuth) {}
}
