import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'angular-presentation-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  constructor(private auth: AngularFireAuth) { }

  ngOnInit() {
  }
  
  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.auth.signOut();
  }
}
