import { Component } from '@angular/core';

function generateData() {
  return Array.from(new Array(10)).map(index =>
    Math.round(Math.random() * 300)
  );
}

@Component({
  selector: 'kirjs-app',
  template: `
    <svg>
      <g
        *ngFor="let item of data; let i = index; trackBy: getIndex"
        [style.transform]="
          'translate(' + barSpace * i + 'px, ' + (320 - item) + 'px)'
        "
      >
        <rect
          [attr.width]="barWidth"
          [attr.height]="item"
          fill="pink"
          stroke="black"
          stroke-width="4"
        ></rect>

        <text [attr.x]="barWidth / 2" y="-10">{{ item }}</text>
      </g>
    </svg>
  `
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
