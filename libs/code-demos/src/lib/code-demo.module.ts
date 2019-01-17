import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { SimpleEditorModule } from './editor/simple-editor.module';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '../../../../libs/browser/src/lib/browser.module';
import { CodeDemo } from './code-demo/code-demo.component';
import { EditorFromModelComponent } from './multitab-editor/editor-from-model/editor-from-model.component';
import { MultitabEditorComponent } from './multitab-editor/multitab-editor.component';
import { FilePathComponent } from './file-path/file-path.component';
import { CodeDemoRunnerComponent } from '@codelab/code-demos/src/lib/code-demo-runner/code-demo-runner.component';


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
    MultitabEditorComponent,
    EditorFromModelComponent,
    FilePathComponent,
    CodeDemoRunnerComponent,
    CodeDemo,
  ],
  exports: [
    FilePathComponent,
    MultitabEditorComponent,
    CodeDemoRunnerComponent,
    EditorFromModelComponent,
    CodeDemo,
  ],
})
export class CodeDemoModule {
}
