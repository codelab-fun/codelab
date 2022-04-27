import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { SlidePreviewComponent } from './slide-preview/slide-preview.component';
import { DynamicRendererComponent } from './slide-preview/dynamic-renderer/dynamic-renderer.component';
import { BlankComponent } from './slide-preview/blank/blank.component';
import { NgxdModule } from '@ngxd/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PreviewComponent,
    SlidePreviewComponent,
    DynamicRendererComponent,
    BlankComponent,
  ],
  exports: [PreviewComponent, SlidePreviewComponent, DynamicRendererComponent],
  imports: [CommonModule, NgxdModule, FormsModule],
})
export class PreviewModule {}
