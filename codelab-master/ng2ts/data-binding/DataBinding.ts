import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'my-flag',

  template: `<my-rectangle [color]="'yellow'" [height]="60"></my-rectangle>
    <my-rectangle [color]="'blue'" [height]='30'></my-rectangle>
    <my-rectangle [color]="'red'" [height]='30'></my-rectangle>`


})
export class ParentComponent {
}

@Component({
  selector: 'my-rectangle',
  template: `<div  [style]="getCss()">1</div>`
})
export class Rectangle {
  @Input() color: string;
  @Input() height: number;

  constructor(private sanitizer: DomSanitizer) {
  }

  getCss() {
    return this.sanitizer.bypassSecurityTrustStyle(`
      width: 300;
      height: 30px; 
      background: ${this.color};
    `);
  }
}

