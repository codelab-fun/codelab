import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '../../../../libs/browser/src/lib/browser.module';
import { CodeDemoComponent } from './code-demo/code-demo.component';
import { EditorFromModelComponent } from './multitab-editor/editor-from-model/editor-from-model.component';
import { MultitabEditorComponent } from './multitab-editor/multitab-editor.component';
import { FilePathComponent } from './file-path/file-path.component';
import { CodeDemoRunnerComponent } from './code-demo-runner/code-demo-runner.component';
import { SimpleHighlightMatchDirective } from './code-demo-editor/simple-highlight-match.directive';
import { CodeDemoEditorComponent } from './code-demo-editor/code-demo-editor.component';
import { RealtimeEvalComponent } from './realtime-eval/realtime-eval.component';

import { CodeDemoEditorAutoFolding } from './code-demo-editor/code-demo-editor.auto-folding';
import { CodeDemoEditorLineChange } from './code-demo-editor/code-demo-editor.line-change';

@NgModule({
  imports: [
    CommonModule,
    BrowserWindowModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [
    MultitabEditorComponent,
    EditorFromModelComponent,
    FilePathComponent,
    CodeDemoRunnerComponent,
    CodeDemoComponent,
    SimpleHighlightMatchDirective,
    CodeDemoEditorComponent,
    RealtimeEvalComponent,
    CodeDemoEditorLineChange,
    CodeDemoEditorAutoFolding
  ],
  exports: [
    FilePathComponent,
    MultitabEditorComponent,
    CodeDemoRunnerComponent,
    EditorFromModelComponent,
    CodeDemoComponent,
    SimpleHighlightMatchDirective,
    CodeDemoEditorComponent,
    RealtimeEvalComponent,
    CodeDemoEditorLineChange,
    CodeDemoEditorAutoFolding
  ]
})
export class CodeDemoModule {
}
