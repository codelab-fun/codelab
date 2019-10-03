import { Component } from '@angular/core';
import { LoginService } from '@codelab/firebase-login/src/lib/login.service';

@Component({
  selector: 'codelab-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent {
  constructor(readonly loginService: LoginService) {}

  login() {
    this.loginService.loginWithGithub();
  }

  logout() {
    this.loginService.logout();
  }
}
