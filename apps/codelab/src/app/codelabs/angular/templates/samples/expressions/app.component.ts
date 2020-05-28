import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{ fullName() }}!</h1>
  `
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  lastName = 'Renoir';
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
