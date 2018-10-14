import { Component } from '@angular/core';


function generateData() {
  return Array.from(new Array(10)).map(index => (
    {
      index,
      value: Math.round(Math.random() * 300)
    }));
}

@Component({
  selector: 'my-app',
  template: `
    <svg>
      <g *ngFor="let item of data; let i = index; trackBy:getIndex"
         [style.transform]="'translate('+(barSpace*i)+'px, '+(320-item.value)+'px)'">
        <rect [attr.width]="barWidth"
              [attr.height]="item.value"
              fill="pink"
              stroke="black"
              stroke-width="4"
        ></rect>

        <text [attr.x]="barWidth/2" y=-10>
          {{item.value}}
        </text>
      </g>
      <g appTicks style="transform: translate(0, 350px)" [data]="data"></g>
    </svg>`
})
export class AppComponent {
  barWidth = 30;
  padding = 10;
  barSpace = this.padding + this.barWidth;
  data = generateData();

  constructor() {
    window.setInterval(() => {
      this.data = generateData();
    }, 1000);
  }

  getIndex(a, b) {
    return a;
  }
}
