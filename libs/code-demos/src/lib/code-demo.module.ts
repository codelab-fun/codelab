import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '@codelab/browser';
import { CodeDemoComponent } from './code-demo/code-demo.component';
import { EditorFromModelComponent } from './multitab-editor/editor-from-model/editor-from-model.component';
import { MultitabEditorComponent } from './multitab-editor/multitab-editor.component';
import { FilePathComponent } from './file-path/file-path.component';
import { CodeDemoRunnerComponent } from './code-demo-runner/code-demo-runner.component';
import { CodeDemoEditorHighlightDirective } from './code-demo-editor/directives/code-demo-editor.highlight.directive';
import { CodeDemoEditorComponent } from './code-demo-editor/code-demo-editor.component';
import { RealtimeEvalComponent } from './realtime-eval/realtime-eval.component';

import { CodeDemoEditorAutoFoldingDirective } from './code-demo-editor/directives/code-demo-editor.auto-folding.directive';
import { CodeDemoEditorLineChangeDirective } from './code-demo-editor/directives/code-demo-editor.line-change.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserWindowModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  declarations: [
    MultitabEditorComponent,
    EditorFromModelComponent,
    FilePathComponent,
    CodeDemoRunnerComponent,
    CodeDemoComponent,
    CodeDemoEditorHighlightDirective,
    CodeDemoEditorComponent,
    RealtimeEvalComponent,
    CodeDemoEditorLineChangeDirective,
    CodeDemoEditorAutoFoldingDirective
  ],
  exports: [
    FilePathComponent,
    MultitabEditorComponent,
    CodeDemoRunnerComponent,
    EditorFromModelComponent,
    CodeDemoComponent,
    CodeDemoEditorHighlightDirective,
    CodeDemoEditorComponent,
    RealtimeEvalComponent,
    CodeDemoEditorLineChangeDirective,
    CodeDemoEditorAutoFoldingDirective
  ]
})
export class CodeDemoModule {}
