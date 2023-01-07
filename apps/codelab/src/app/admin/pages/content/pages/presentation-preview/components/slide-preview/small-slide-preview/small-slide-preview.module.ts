import { NgModule } from '@angular/core';
import { SmallSlidePreviewComponent } from './small-slide-preview.component';
import { SlidePreviewModule } from '../slide-preview.module';

@NgModule({
  imports: [SlidePreviewModule],
  declarations: [SmallSlidePreviewComponent],
  exports: [SmallSlidePreviewComponent],
})
export class SmallSlidePreviewModule {
}
