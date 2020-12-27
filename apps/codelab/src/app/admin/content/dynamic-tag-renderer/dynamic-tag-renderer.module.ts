import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTagRendererComponent } from './dynamic-tag-renderer.component';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';

@NgModule({
  declarations: [DynamicTagRendererComponent],
  exports: [DynamicTagRendererComponent],
  imports: [CommonModule, CodelabComponentsModule]
})
export class DynamicTagRendererModule {}
