import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SlideEditorComponent } from './slide-editor.component';
import { SlideMetaEditorComponent } from './slide-meta-editor/slide-meta-editor.component';
import { SlideHtmlEditorComponent } from './slide-html-editor/slide-html-editor.component';
import { ActionBarModule } from './action-bar/action-bar.module';
import { CustomComponentPreviewsModule } from '../wrappers/custom-component-previews/custom-component-previews.module';
import { CustomComponentEditorsModule } from '../wrappers/custom-component-editors/custom-component-editors.module';
import { DynamicRendererModule } from '../../presentation-preview/slide-preview/dynamic-renderer';

@NgModule({
  declarations: [
    SlideEditorComponent,
    SlideMetaEditorComponent,
    SlideHtmlEditorComponent,
  ],
  exports: [
    SlideEditorComponent,
    SlideMetaEditorComponent,
    SlideHtmlEditorComponent,
  ],
  imports: [
    CommonModule,
    CustomComponentEditorsModule,
    CustomComponentPreviewsModule,
    MatIconModule,
    DragDropModule,
    MatButtonModule,
    ActionBarModule,
    MatMenuModule,
    DynamicRendererModule,
  ],
})
export class SlideEditorModule {}
