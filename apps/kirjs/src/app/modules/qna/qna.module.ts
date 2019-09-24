import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { QnaComponent } from './qna.component';
import { QuestionsModule } from '@codelab/utils/src/lib/sync/components/questions/questions.module';
import { SyncModule } from '@codelab/utils/src/lib/sync/sync.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { SyncPollService } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';
import { SyncButtonModule } from '@codelab/utils/src/lib/sync/sync-button/sync-button.module';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { SyncRegistrationModule } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.module';

const routes = RouterModule.forChild([{ path: '', component: QnaComponent }]);

@NgModule({
  declarations: [QnaComponent],
  providers: [
    SyncDataService,
    SyncSessionService,
    SyncDbService,
    SyncPollService,
    SyncRegistrationService
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
    SyncRegistrationModule
  ]
})
export class QnaModule {}
