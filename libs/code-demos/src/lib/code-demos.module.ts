import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleAngularRunnerComponent } from '@angular-presentation/code-demos/src/lib/simple-angular-runner/simple-angular-runner.component';
import { BrowserWindowModule } from '@angular-presentation/browser';
import { SimpleAngularEditorComponent } from '@angular-presentation/code-demos/src/lib/simple-angular-runner/simple-angular-editor.component';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { SimpleEditorModule } from '@angular-presentation/code-demos/src/lib/editor/simple-editor.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserWindowModule,
    MatSelectModule,
    MatButtonModule,
    SimpleEditorModule,
    FormsModule,
  ],
  declarations: [
    SimpleAngularRunnerComponent,
    SimpleAngularEditorComponent,
  ],
  exports: [
    SimpleAngularRunnerComponent,
    SimpleAngularEditorComponent,
  ],
})
export class CodeDemosModule {
}
