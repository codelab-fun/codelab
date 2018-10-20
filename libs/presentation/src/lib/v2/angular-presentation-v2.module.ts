import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationComponentV2 } from '@angular-presentation/presentation/src/lib/v2/pres/presentation-componentv2.component';
import { PresentationModule } from '@angular-presentation/presentation';
import { SlideDirective } from '@angular-presentation/presentation/src/lib/v2/slide/slide.directive';


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
