import { NgModule } from '@angular/core';
import { SimpleEditorComponent } from './simple-editor.component';
import { SimpleHighlightDirective } from './simple-highlight.directive';
import { SimpleHighlightMatchDirective } from './simple-highlight-match.directive';
import { SimpleAngularEditorComponent } from '@angular-presentation/code-demos/src/lib/editor/simple-angular-editor.component';
import { FormsModule } from '@angular/forms';
import { CodeDemosModule } from '@angular-presentation/code-demos';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    CodeDemosModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
  ],
  declarations: [
    SimpleEditorComponent,
    SimpleHighlightDirective,
    SimpleHighlightMatchDirective,
    SimpleAngularEditorComponent,
  ],
  exports: [
    SimpleHighlightMatchDirective,
    SimpleEditorComponent,
    SimpleHighlightDirective,
    SimpleAngularEditorComponent,
  ],
})
export class SimpleEditorModule {
}

