import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import { BarChartModule } from '@codelab/utils/src/lib/sync/components/poll/common/bar-chart/bar-chart.module';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { LeaderboardPresenterComponent } from './leaderboard-presenter/leaderboard-presenter.component';
import { LeaderboardViewerComponent } from './leaderboard-viewer/leaderboard-viewer.component';

@NgModule({
  declarations: [
    LeaderboardComponent,
    LeaderboardPresenterComponent,
    LeaderboardViewerComponent
  ],
  exports: [LeaderboardComponent],
  imports: [CommonModule, BarChartModule, SyncDirectivesModule]
})
export class LeaderboardModule {}
