import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideEditorComponent } from './slide-editor.component';
import { SlideMetaEditorComponent } from './slide-meta-editor/slide-meta-editor.component';
import { SlideHtmlEditorComponent } from './slide-html-editor/slide-html-editor.component';

import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { ActionBarModule } from './action-bar/action-bar.module';
import { PreviewModule } from '../preview/preview.module';
import { CustomComponentPreviewsModule } from '../wrappers/custom-component-previews/custom-component-previews.module';
import { CustomComponentEditorsModule } from '../wrappers/custom-component-editors/custom-component-editors.module';
import { MatMenuModule } from "@angular/material/menu";

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
    PreviewModule,
    MatMenuModule,
  ],
})
export class SlideEditorModule {}
