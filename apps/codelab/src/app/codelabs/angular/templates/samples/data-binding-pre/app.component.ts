import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{ fullName() }}!</h1>
    <img src="{{ avatar }}" />
  `
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  lastName = 'Renoir';
  avatar = 'assets/images/renoir.jpg';

  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
