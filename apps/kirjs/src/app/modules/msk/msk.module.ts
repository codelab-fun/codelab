import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { MskComponent } from './msk.component';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { SyncPollService } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';
import { SyncButtonModule } from '@codelab/utils/src/lib/sync/sync-button/sync-button.module';
import { QuestionsModule } from '@codelab/utils/src/lib/sync/components/questions/questions.module';
import { SyncModule } from '@codelab/utils/src/lib/sync/sync.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { SyncRegistrationModule } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.module';
import { SyncPollModule } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.module';

const routes = RouterModule.forChild(SlidesRoutes.get(MskComponent));

@NgModule({
  providers: [
    SyncDataService,
    SyncSessionService,
    SyncDbService,
    SyncPollService,
    SyncRegistrationService
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
    SyncPollModule
  ]
})
export class MskModule {}
