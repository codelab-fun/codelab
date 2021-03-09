import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { SlidePreviewModule } from './slide-preview/slide-preview.module';

@NgModule({
  declarations: [PreviewComponent],
  imports: [CommonModule, SlidePreviewModule],
  exports: [PreviewComponent]
})
export class PreviewModule {}
