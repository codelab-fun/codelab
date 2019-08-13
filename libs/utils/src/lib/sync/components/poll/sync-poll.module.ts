import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncPollAdminComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-admin/sync-poll-admin.component';
import { SyncPollPresenterComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-presenter/sync-poll-presenter.component';
import { SyncPollViewerComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-viewer/sync-poll-viewer.component';
import { SyncPollComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.component';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { StarsModule } from '@codelab/utils/src/lib/sync/components/poll/common/stars/stars.module';
import { StarsPresenterComponent } from './sync-poll-presenter/stars-presenter/stars-presenter.component';
import { ChoicePresenterComponent } from './sync-poll-presenter/choice-presenter/choice-presenter.component';

@NgModule({
  declarations: [
    SyncPollAdminComponent,
    SyncPollPresenterComponent,
    SyncPollViewerComponent,
    SyncPollComponent,
    StarsPresenterComponent,
    ChoicePresenterComponent,
  ],
  exports: [
    SyncPollComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    SyncDirectivesModule,
    AngularFireDatabaseModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    StarsModule,
  ]
})
export class SyncPollModule {
}
