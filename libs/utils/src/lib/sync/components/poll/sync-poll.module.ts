import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SyncPollAdminComponent } from './sync-poll-admin/sync-poll-admin.component';
import { SyncPollPresenterComponent } from './sync-poll-presenter/sync-poll-presenter.component';
import { SyncPollViewerComponent } from './sync-poll-viewer/sync-poll-viewer.component';
import { SyncPollComponent } from './sync-poll.component';
import { SyncDirectivesModule } from '../../directives/sync-directives.module';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { StarsModule } from './common/stars/stars.module';
import { StarsPresenterComponent } from './sync-poll-presenter/stars-presenter/stars-presenter.component';
import { ChoicePresenterComponent } from './sync-poll-presenter/choice-presenter/choice-presenter.component';
import { SyncPollViewerChoiceComponent } from './sync-poll-viewer/sync-poll-viewer-choice/sync-poll-viewer-choice.component';
import { BarChartModule } from './common/bar-chart/bar-chart.module';
import { LeaderboardModule } from './sync-poll-presenter/leaderboard/leaderboard.module';

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
