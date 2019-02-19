import { Component } from '@angular/core';
import { LoginService } from '@codelab/firebase-login/src/lib/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'codelab-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent {

  constructor(
    private auth: AngularFireAuth,
    readonly  loginService: LoginService
  ) {
  }

  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.auth.signOut();
  }

}
