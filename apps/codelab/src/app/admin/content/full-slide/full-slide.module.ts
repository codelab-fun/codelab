import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullSlideComponent } from './full-slide.component';
import { DynamicTagRendererModule } from '../dynamic-tag-renderer/dynamic-tag-renderer.module';

@NgModule({
  declarations: [FullSlideComponent],
  exports: [FullSlideComponent],
  imports: [CommonModule, DynamicTagRendererModule]
})
export class FullSlideModule {}
