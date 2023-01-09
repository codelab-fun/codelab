import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SlideEditorComponent } from './slide-editor.component';
import { SlideHtmlEditorModule } from './components/slide-html-editor';
import { SlideMetaEditorModule } from './components/slide-meta-editor';
import { ActionBarModule } from './components/action-bar';
import { CustomComponentPreviewsModule } from '../wrappers/custom-component-previews/custom-component-previews.module';
import { CustomComponentEditorsModule } from '../wrappers/custom-component-editors/custom-component-editors.module';
import { DynamicRendererModule } from '../../../presentation-preview/components/slide-preview/dynamic-renderer';

@NgModule({
  declarations: [
    SlideEditorComponent,
  ],
  exports: [
    SlideEditorComponent,
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
    SlideHtmlEditorModule,
    SlideMetaEditorModule
  ],
})
export class SlideEditorModule {}
