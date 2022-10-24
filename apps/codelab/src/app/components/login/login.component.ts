import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from '@codelab/firebase-login';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'codelab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private auth: AngularFireAuth,
    readonly loginService: LoginService
  ) {}

  login() {
    this.auth.signInWithPopup(new GoogleAuthProvider());
  }
}
