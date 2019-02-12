import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { LoginService } from '@codelab/firebase-login/src/lib/login.service';

@Component({
  selector: 'codelab-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.css']
})
export class LoginContentComponent implements OnInit {

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
