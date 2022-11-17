import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { SyncPollAdminComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-admin/sync-poll-admin.component';
import { SyncPollPresenterComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-presenter/sync-poll-presenter.component';
import { SyncPollViewerComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-viewer/sync-poll-viewer.component';
import { SyncPollComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.component';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { StarsModule } from '@codelab/utils/src/lib/sync/components/poll/common/stars/stars.module';
import { StarsPresenterComponent } from './sync-poll-presenter/stars-presenter/stars-presenter.component';
import { ChoicePresenterComponent } from './sync-poll-presenter/choice-presenter/choice-presenter.component';
import { SyncPollViewerChoiceComponent } from './sync-poll-viewer/sync-poll-viewer-choice/sync-poll-viewer-choice.component';
import { BarChartModule } from '@codelab/utils/src/lib/sync/components/poll/common/bar-chart/bar-chart.module';
import { LeaderboardModule } from '@codelab/utils/src/lib/sync/components/poll/sync-poll-presenter/leaderboard/leaderboard.module';

@NgModule({
  declarations: [
    SyncPollAdminComponent,
    SyncPollPresenterComponent,
    SyncPollViewerComponent,
    SyncPollComponent,
    StarsPresenterComponent,
    ChoicePresenterComponent,
    SyncPollViewerChoiceComponent,
  ],
  exports: [SyncPollComponent],
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
    BarChartModule,
    MatTabsModule,
    LeaderboardModule,
  ],
})
export class SyncPollModule {}
