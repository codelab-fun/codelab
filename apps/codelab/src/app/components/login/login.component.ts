import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '@codelab/firebase-login';
import { auth } from 'firebase/app';

@Component({
  selector: 'codelab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private auth: AngularFireAuth,
    readonly loginService: LoginService
  ) {}

  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
