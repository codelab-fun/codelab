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

  // @Input() votes: { [key: string]: UserVote };
  // @Input() timestamp: number;
  // @Input() answerIndex;
  // private breakdown: Response[];
  //
  // ngOnChanges(changes: SimpleChanges) {
  //   if (this.timestamp > 0 && this.votes && Object.values(this.votes).length > 0 && this.answerIndex !== null) {
  //     this.breakdown = Object.entries(this.votes).map(([key, data]) => {
  //       return {
  //         key,
  //         correct: data.answer === this.answerIndex,
  //         speed: this.timestamp - data.time,
  //         score: 1
  //       };
  //     });
  //   }
  // }
  //
  // ngOnInit() {
  // }
}
