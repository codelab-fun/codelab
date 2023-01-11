import { Component } from '@angular/core';

@Component({
  selector: 'break-my-computer',
  template: ` I'll break your computer `,
})
export class BreakMyComputerComponent {
  constructor() {
    alert('Congratulations! Your computer has been broken successfully!');
  }
}
