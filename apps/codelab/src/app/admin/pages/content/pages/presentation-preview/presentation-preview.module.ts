import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidePreviewModule } from './components/slide-preview';
import { PresentationPreviewComponent } from './presentation-preview.component';

@NgModule({
  imports: [
    CommonModule,
    SlidePreviewModule
  ],
  declarations: [PresentationPreviewComponent],
})
export class PresentationPreviewModule {
}
