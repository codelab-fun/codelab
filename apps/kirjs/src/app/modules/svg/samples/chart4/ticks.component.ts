import { Component, Input } from '@angular/core';

@Component({
  selector: '[appTicks]',
  template: `
    <svg:text *ngFor="let item of data; let i = index; trackBy:getIndex"
              [attr.x]="barSpace*(i+0.3)"
              style = "text-anchor: center"
              fill=black>{{i}}</text>`
})
export class TicksComponent {
  @Input() data;
  @Input() barWidth = 30;
  padding = 10;
  barSpace = this.padding + this.barWidth;

  getIndex(i: number){
    return i;
  }
}
