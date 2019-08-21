import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import { BarChartModule } from '@codelab/utils/src/lib/sync/components/poll/common/bar-chart/bar-chart.module';

@NgModule({
  declarations: [LeaderboardComponent],
  exports: [
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    BarChartModule
  ]
})
export class LeaderboardModule { }
