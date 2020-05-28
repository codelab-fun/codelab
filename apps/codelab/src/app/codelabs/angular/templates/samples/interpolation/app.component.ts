import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{ firstName }}!</h1>
  `
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
}
