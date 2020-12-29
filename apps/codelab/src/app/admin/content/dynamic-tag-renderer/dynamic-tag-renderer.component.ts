import { Component, Injector, Input, OnInit } from '@angular/core';
import { fakeCompileSlide } from './compiler';

@Component({
  selector: 'slides-dynamic-tag-renderer',
  template: `
    <ng-template
      *ngIf="component"
      [ngComponentOutlet]="component"
      [ngComponentOutletInjector]="injector"
    ></ng-template>
  `
})
export class DynamicTagRendererComponent implements OnInit {
  @Input() slide;

  component;

  constructor(readonly injector: Injector) {}

  ngOnInit() {
    console.log(this.slide);
    this.component = fakeCompileSlide(this.slide);
  }
}
