import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  message = '';

  saveUser(e) {
    this.message = 'User saved';
  }
  submit(e) {
    this.message = 'Enter pressed';
  }
  soundAlarm(s) {
    this.message = s;
  }
}
