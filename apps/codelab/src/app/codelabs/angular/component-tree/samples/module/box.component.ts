import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <slides-circle [size]="100" [color]="circleColor"></slides-circle>
    </div>
  `
})
export class BoxComponent {
  circleColor = 'green';
}
