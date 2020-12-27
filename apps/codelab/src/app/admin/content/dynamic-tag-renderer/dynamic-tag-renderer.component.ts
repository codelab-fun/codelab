import { Component, Injector, Input } from '@angular/core';
import { fakeCompileSlide } from './compiler';

@Component({
  selector: 'slides-dynamic-tag-renderer',
  template: `
    <h1>dsd</h1>
    <ng-template
      *ngIf="component"
      [ngComponentOutlet]="component"
      [ngComponentOutletInjector]="injector"
    ></ng-template>
  `
})
export class DynamicTagRendererComponent {
  @Input() slide;

  component;
  constructor(readonly injector: Injector) {}

  ngOnInit() {
    this.component = fakeCompileSlide(this.slide);
  }
}
