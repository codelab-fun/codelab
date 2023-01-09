import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatButtonModule } from '@angular/material/button';
import { NAVIGATION_BASE_URL, NavigationService } from './services/navigation.service';
import { ContentService } from './services/content.service';
import { AutoSaveService } from './services/auto-save.service';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule,
    MatButtonModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    {provide: NAVIGATION_BASE_URL, useValue: 'admin/content'},
    NavigationService,
    ContentService,
    AutoSaveService,
  ],
  declarations: [ContentComponent]
})
export class ContentModule {
}
