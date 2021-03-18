import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { V2RoutingModule } from './v2-routing.module';
import { V2Component } from './v2.component';
import { PresentationListModule } from './presentation-list/presentation-list.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ContentService } from '../admin/content/presentation-editor/services/content.service';
import {
  NAVIGATION_BASE_URL,
  NavigationService,
} from '../admin/content/presentation-editor/services/navigation.service';
import { PresentationModule } from './presentation/presentation.module';

@NgModule({
  declarations: [V2Component],
  providers: [
    ContentService,
    { provide: NAVIGATION_BASE_URL, useValue: 'v2' },
    NavigationService,
  ],
  imports: [
    CommonModule,
    V2RoutingModule,
    AngularFirestoreModule,
    PresentationListModule,
    PresentationModule,
  ],
})
export class V2Module {}
