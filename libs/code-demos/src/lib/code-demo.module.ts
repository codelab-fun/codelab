import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '../../../../libs/browser/src/lib/browser.module';
import { CodeDemo } from './code-demo/code-demo.component';
import { EditorFromModelComponent } from './multitab-editor/editor-from-model/editor-from-model.component';
import { MultitabEditorComponent } from './multitab-editor/multitab-editor.component';
import { FilePathComponent } from './file-path/file-path.component';
import { CodeDemoRunnerComponent } from './code-demo-runner/code-demo-runner.component';
import { SimpleHighlightMatchDirective } from './code-demo-editor/simple-highlight-match.directive';
import { CodeDemoEditorComponent } from './code-demo-editor/code-demo-editor.component';
import { SimpleHighlightDirective } from './code-demo-editor/simple-highlight.directive';
import { RealtimeEvalComponent } from './realtime-eval/realtime-eval.component';

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
    CodeDemo,
    SimpleHighlightMatchDirective,
    CodeDemoEditorComponent,
    SimpleHighlightDirective,
    RealtimeEvalComponent
  ],
  exports: [
    FilePathComponent,
    MultitabEditorComponent,
    CodeDemoRunnerComponent,
    EditorFromModelComponent,
    CodeDemo,
    SimpleHighlightMatchDirective,
    CodeDemoEditorComponent,
    SimpleHighlightDirective,
    RealtimeEvalComponent
  ]
})
export class CodeDemoModule {}
