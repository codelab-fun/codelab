import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncPollAdminComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-admin/sync-poll-admin.component';
import { SyncPollPresenterComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-presenter/sync-poll-presenter.component';
import { SyncPollViewerComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-viewer/sync-poll-viewer.component';
import { SyncPollComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.component';
import { MatButtonModule, MatCardModule, MatCheckboxModule } from '@angular/material';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [
    SyncPollAdminComponent,
    SyncPollPresenterComponent,
    SyncPollViewerComponent,
    SyncPollComponent,
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
  ]
})
export class SyncPollModule {
}
