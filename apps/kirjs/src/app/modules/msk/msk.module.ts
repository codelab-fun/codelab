import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterModule } from '@angular/router';
import { SlidesModule, SlidesRoutes } from '@codelab/slides';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MskComponent } from './msk.component';
import {
  QuestionsModule,
  SyncButtonModule,
  SyncDataService,
  SyncDbService,
  SyncDirectivesModule,
  SyncModule,
  SyncPollModule,
  SyncPollService,
  SyncRegistrationModule,
  SyncRegistrationService,
  SyncSessionService
} from '@codelab/sync';

const routes = RouterModule.forChild(SlidesRoutes.get(MskComponent));

@NgModule({
  providers: [
    SyncDataService,
    SyncSessionService,
    SyncDbService,
    SyncPollService,
    SyncRegistrationService,
  ],
  declarations: [MskComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes,
    QuestionsModule,
    SyncModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SyncButtonModule,
    SyncDirectivesModule,
    SyncRegistrationModule,
    SyncPollModule,
  ],
})
export class MskModule {}
