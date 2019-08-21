import { Component, Input } from '@angular/core';
import { SyncPollService } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';
import { Observable } from 'rxjs';

interface Response {
  correct: boolean;
  key: string;
  speed: number;
  score: number;
}

@Component({
  selector: 'slides-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  @Input() config;
  private leaderboard$: Observable<any>;

  constructor(private readonly syncPollService: SyncPollService) {
  }

  ngOnInit() {
    this.leaderboard$ = this.syncPollService.calculateScores(this.config.filter(a => a.answer));
  }

}
