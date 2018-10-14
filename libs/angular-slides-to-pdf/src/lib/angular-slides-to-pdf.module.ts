import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSlidesToPdfComponent } from './angular-slides-to-pdf.component';

@NgModule({
  declarations: [AngularSlidesToPdfComponent],
  exports: [AngularSlidesToPdfComponent],
  imports: [CommonModule]
})
export class AngularSlidesToPdfModule {}
