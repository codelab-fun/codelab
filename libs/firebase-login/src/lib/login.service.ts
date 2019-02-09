import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly user$ = this.auth.user;

  constructor(private auth: AngularFireAuth) {
  }
}
