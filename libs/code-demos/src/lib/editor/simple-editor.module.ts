import { NgModule } from '@angular/core';
import { SimpleEditorComponent } from './simple-editor.component';
import { SimpleHighlightDirective } from './simple-highlight.directive';
import { SimpleHighlightMatchDirective } from './simple-highlight-match.directive';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,

  ],
  declarations: [
    SimpleEditorComponent,
    SimpleHighlightDirective,
    SimpleHighlightMatchDirective
  ],
  exports: [
    SimpleHighlightMatchDirective,
    SimpleEditorComponent,
    SimpleHighlightDirective,
  ],
})
export class SimpleEditorModule {
}

