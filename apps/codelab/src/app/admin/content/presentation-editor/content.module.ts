import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { SlideEditorModule } from './slide-editor/slide-editor.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SidePanelModule } from './side-panel/side-panel.module';
import { ContentService } from './content.service';

@NgModule({
  declarations: [ContentComponent],
  exports: [ContentComponent],
  entryComponents: [ContentComponent],
  providers: [ContentService],
  imports: [
    CommonModule,
    SlideEditorModule,
    AngularFirestoreModule,
    DragDropModule,
    RouterModule,
    SidePanelModule
  ]
})
export class ContentModule {}
