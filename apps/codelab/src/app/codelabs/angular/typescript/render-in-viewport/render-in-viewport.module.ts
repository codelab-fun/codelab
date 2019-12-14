
import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderInViewportComponent } from './render-in-viewport.component';
// import { IntersectionObserverDirective } from '../intersection-observer.directive';

@NgModule({
  declarations: [ RenderInViewportComponent ],
  imports: [
    CommonModule
  ],
  exports: [ RenderInViewportComponent ]
})
export class RenderInViewportModule { }
