import { Component } from '@angular/core';

@Component({
  selector: '' + 'app-alert',
  template: `
    Hi ALert
  `
})
export class AlertComponent {
  constructor() {
    alert('Hello');
  }
}
