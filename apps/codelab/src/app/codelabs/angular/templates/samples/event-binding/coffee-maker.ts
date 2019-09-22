import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'coffee-maker',
  template: `
    Amount of coffee left: {{amount}}%
  `
})
export class CoffeeMakerComponent {
  @Output() depleted: EventEmitter<any> = new EventEmitter();
  amount = 100;
  timer = null;

  constructor() {
    this.timer = setInterval(() => {
      this.amount -= 10;
      if (this.amount < 40) {
        clearInterval(this.timer);
        this.depleted.next();
      }
    }, 500);
  }
}
