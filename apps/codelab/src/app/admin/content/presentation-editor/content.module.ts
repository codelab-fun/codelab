import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { SlideEditorModule } from './slide-editor/slide-editor.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SidePanelModule } from './side-panel/side-panel.module';
import { ContentService } from './services/content.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  NAVIGATION_BASE_URL,
  NavigationService,
} from './services/navigation.service';

@NgModule({
  declarations: [ContentComponent],
  exports: [ContentComponent],
  entryComponents: [ContentComponent],
  providers: [
    NavigationService,
    ContentService,
    { provide: NAVIGATION_BASE_URL, useValue: 'admin/content' },
  ],
  imports: [
    CommonModule,
    SlideEditorModule,
    AngularFirestoreModule,
    DragDropModule,
    RouterModule,
    SidePanelModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ContentModule {}
