import { Component } from '@angular/core';

/* tslint:disable */
@Component({
  selector: 'break-my-computer',
  template: `
    I'll break your computer
  `
})
export class BreakMyComputerComponent {
  constructor() {
    alert('Congratulations! Your computer has been broken successfully!');
  }
}
