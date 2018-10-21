import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponentV2 } from './pres/presentation-componentv2.component';
import { SlideDirective } from './slide/slide.directive';
import { PresentationModule } from '../presentation.module';


@NgModule({
  imports: [
    CommonModule,
    PresentationModule
  ],
  declarations: [SlideDirective, PresentationComponentV2],
  exports: [SlideDirective, PresentationComponentV2],
})
export class AngularPresentationV2Module {
}
