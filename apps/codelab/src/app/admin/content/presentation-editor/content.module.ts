import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { SlideEditorModule } from './slide-editor/slide-editor.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SidePanelModule } from './side-panel/side-panel.module';
import { ContentService } from './services/content.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService, } from './services/navigation.service';
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../../../../environments/environment";
import { ContentRoutingModule } from "./content-routing.module";
import { ContentWrapperComponent } from "./content-wrapper/content-wrapper.component";
import { AutoSaveService } from "./services/auto-save.service";

@NgModule({
  declarations: [ContentComponent, ContentWrapperComponent],
  exports: [ContentComponent, ContentWrapperComponent],
  providers: [
    NavigationService,
    ContentService,
    AutoSaveService,
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    ContentRoutingModule,
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
export class ContentModule {
}
