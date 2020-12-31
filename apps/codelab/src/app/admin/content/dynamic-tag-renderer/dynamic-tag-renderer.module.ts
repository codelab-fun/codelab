import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTagRendererComponent } from './dynamic-tag-renderer.component';
import { CustomComponentEditorsModule } from '../custom-component-editors/custom-component-editors.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DynamicTagRendererComponent],
  exports: [DynamicTagRendererComponent],
  imports: [CommonModule, CustomComponentEditorsModule, FormsModule]
})
export class DynamicTagRendererModule {}
