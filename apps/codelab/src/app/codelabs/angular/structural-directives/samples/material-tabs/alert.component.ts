import { Component } from '@angular/core';


@Component({
  selector: '' + 'app-alert',
  template: `This is AlertComponent!`
})
export class AlertComponent {
  constructor() {
    alert('Hello');
  }
}
