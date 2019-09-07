import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'birthday-card',
  template: `
    birthday card component <br>
    {{date}}
  `
})

export class BirthdayCardComponent {
  @Input() date = '';
}
