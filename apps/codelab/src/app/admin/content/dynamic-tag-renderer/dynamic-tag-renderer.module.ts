import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTagRendererComponent } from './dynamic-tag-renderer.component';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { CustomComponentEditorsModule } from '../custom-component-editors/custom-component-editors.module';

@NgModule({
  declarations: [DynamicTagRendererComponent],
  exports: [DynamicTagRendererComponent],
  imports: [CommonModule, CodelabComponentsModule, CustomComponentEditorsModule]
})
export class DynamicTagRendererModule {}
