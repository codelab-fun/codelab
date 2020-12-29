import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideEditorComponent } from './slide-editor.component';
import { SlideMetaEditorComponent } from './slide-meta-editor/slide-meta-editor.component';
import { SlideHtmlEditorComponent } from './slide-html-editor/slide-html-editor.component';

@NgModule({
  declarations: [
    SlideEditorComponent,
    SlideMetaEditorComponent,
    SlideHtmlEditorComponent
  ],
  exports: [
    SlideEditorComponent,
    SlideMetaEditorComponent,
    SlideHtmlEditorComponent
  ],
  imports: [CommonModule]
})
export class SlideEditorModule {}
