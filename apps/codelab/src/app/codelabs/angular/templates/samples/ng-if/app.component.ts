import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{ firstName }}!</h1>
    <img [src]="avatar" *ngIf="onDisplay()" />
  `
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  avatar = 'assets/images/renoir.jpg';

  onDisplay() {
    return false; //  Try changing to true!
  }
}
