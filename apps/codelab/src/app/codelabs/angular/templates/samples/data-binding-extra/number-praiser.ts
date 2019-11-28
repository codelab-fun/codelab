import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'number-praiser',
  template: `
    <h2 style="background: #fdf700">
      🎈 {{ number }} &nbsp; 🎈 What an amazing number!!! 🎖
    </h2>
  `
})
export class BirthdayCardComponent {
  @Input() number = 0;
}
