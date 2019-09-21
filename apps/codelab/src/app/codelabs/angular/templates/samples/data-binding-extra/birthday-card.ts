import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'birthday-card',
  template: `
    <h2>
      🎈Happy birthday, <b>🎈{{ name }}!! 🎈</b>
    </h2>
  `
})
export class BirthdayCardComponent {
  @Input() name = '';
}
