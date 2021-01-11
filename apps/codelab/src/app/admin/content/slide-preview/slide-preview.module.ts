import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidePreviewComponent } from './slide-preview.component';

@NgModule({
  declarations: [SlidePreviewComponent],
  exports: [SlidePreviewComponent],
  imports: [CommonModule]
})
export class SlidePreviewModule {}
