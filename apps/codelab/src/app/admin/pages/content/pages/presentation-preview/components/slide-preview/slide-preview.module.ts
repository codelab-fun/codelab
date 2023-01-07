import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicRendererModule } from './dynamic-renderer';
import { SlidePreviewComponent } from './slide-preview.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicRendererModule
  ],
  declarations: [SlidePreviewComponent],
  exports: [SlidePreviewComponent]
})
export class SlidePreviewModule {
}
