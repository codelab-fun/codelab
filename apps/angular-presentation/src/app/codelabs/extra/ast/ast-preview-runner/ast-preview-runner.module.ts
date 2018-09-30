import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstPreviewRunnerComponent } from './ast-preview-runner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AstPreviewRunnerComponent],
  exports: [AstPreviewRunnerComponent],
})
export class AstPreviewRunnerModule {
}
