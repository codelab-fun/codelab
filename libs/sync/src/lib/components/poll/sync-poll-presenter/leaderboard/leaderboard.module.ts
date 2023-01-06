import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import { BarChartModule } from '../../common/bar-chart/bar-chart.module';
import { SyncDirectivesModule } from '../../../../directives/sync-directives.module';
import { LeaderboardPresenterComponent } from './leaderboard-presenter/leaderboard-presenter.component';
import { LeaderboardViewerComponent } from './leaderboard-viewer/leaderboard-viewer.component';

@NgModule({
  declarations: [
    LeaderboardComponent,
    LeaderboardPresenterComponent,
    LeaderboardViewerComponent,
  ],
  exports: [LeaderboardComponent],
  imports: [CommonModule, BarChartModule, SyncDirectivesModule],
})
export class LeaderboardModule {}
