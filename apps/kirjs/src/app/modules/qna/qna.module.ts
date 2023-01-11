import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SlidesModule } from '@codelab/slides';
import { QnaComponent } from './qna.component';
import {
  SyncDataService,
  SyncDbService,
  SyncSessionService,
  SyncPollService,
  SyncRegistrationService,
  SyncModule,
  QuestionsModule,
  SyncButtonModule,
  SyncDirectivesModule,
  SyncRegistrationModule
} from '@codelab/sync';

const routes = RouterModule.forChild([{ path: '', component: QnaComponent }]);

@NgModule({
  declarations: [QnaComponent],
  providers: [
    SyncDataService,
    SyncSessionService,
    SyncDbService,
    SyncPollService,
    SyncRegistrationService,
  ],
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
  ],
})
export class QnaModule {}
