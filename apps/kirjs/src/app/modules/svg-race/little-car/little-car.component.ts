import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[kirjs-little-car]',
  templateUrl: './little-car.component.html',
  styleUrls: ['./little-car.component.css']
})
export class LittleCarComponent {
  @Input() position = { x: 0, y: 0, angle: 0 };
  lightColor = '#ffbc05';
  darkColor = '#e38100';

  @Input()
  set color(color: string) {
    this.lightColor = color;
    this.darkColor = '#444';
  }
}
