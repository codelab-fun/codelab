import { Component } from '@angular/core';

@Component({
  selector: 'kirjs-app',
  template: `
    <svg>
      <rect
        x="100"
        width="200"
        y="100"
        height="200"
        fill="pink"
        stroke="black"
        stroke-width="20"
      ></rect>
    </svg>
  `
})
export class AppComponent {
  y = 200;

  constructor() {
    window.setInterval(() => {
      this.y = Math.random() * 300;
    }, 200);
  }
}
