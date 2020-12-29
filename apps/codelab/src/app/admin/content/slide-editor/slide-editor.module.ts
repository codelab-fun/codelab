import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideEditorComponent } from './slide-editor.component';
import { SlideMetaEditorComponent } from './slide-meta-editor/slide-meta-editor.component';
import { SlideHtmlEditorComponent } from './slide-html-editor/slide-html-editor.component';
import { CustomEditorComponent } from './custom-editor/custom-editor.component';
import { DynamicTagRendererModule } from '../dynamic-tag-renderer/dynamic-tag-renderer.module';
import { CustomComponentEditorsModule } from '../custom-component-editors/custom-component-editors.module';

@NgModule({
  declarations: [
    SlideEditorComponent,
    SlideMetaEditorComponent,
    SlideHtmlEditorComponent,
    CustomEditorComponent
  ],
  exports: [
    SlideEditorComponent,
    SlideMetaEditorComponent,
    SlideHtmlEditorComponent
  ],
  imports: [
    CommonModule,
    DynamicTagRendererModule,
    CustomComponentEditorsModule
  ]
})
export class SlideEditorModule {}
