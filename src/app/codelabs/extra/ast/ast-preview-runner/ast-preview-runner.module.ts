import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstPreviewRunnerComponent } from './ast-preview-runner.component';
import { AstVizModule } from 'angular-ast-viz';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AstVizModule, FormsModule],
  declarations: [AstPreviewRunnerComponent],
  exports: [AstPreviewRunnerComponent],
})
export class AstPreviewRunnerModule {
}
