import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidePreviewComponent } from './slide-preview.component';
import { SlidesDynamicRendererModule } from './dynamic-renderer/slides-dynamic-renderer.module';

@NgModule({
  declarations: [SlidePreviewComponent],
  imports: [CommonModule, SlidesDynamicRendererModule],
  exports: [SlidePreviewComponent]
})
export class SlidePreviewModule {}
