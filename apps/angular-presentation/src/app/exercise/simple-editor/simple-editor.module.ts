import { NgModule } from '@angular/core';
import { SimpleEditorComponent } from './simple-editor.component';
import { SimpleHighlightDirective } from './simple-highlight.directive';
import { SimpleHighlightMatchDirective } from './simple-highlight-match.directive';

@NgModule({
  declarations: [SimpleEditorComponent, SimpleHighlightDirective, SimpleHighlightMatchDirective],
  exports: [SimpleHighlightMatchDirective, SimpleEditorComponent, SimpleHighlightDirective],
})
export class SimpleEditorModule {
}

