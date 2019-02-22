import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { LoginService } from '@codelab/firebase-login/src/lib/login.service';

@Component({
  selector: 'codelab-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  constructor(private auth: AngularFireAuth,
              readonly  loginService: LoginService) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.auth.signOut();
  }
}
