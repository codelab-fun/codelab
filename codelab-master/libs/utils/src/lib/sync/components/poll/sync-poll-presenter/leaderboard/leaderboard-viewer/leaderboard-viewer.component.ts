import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SyncPollService } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';

@Component({
  selector: 'codelab-leaderboard-viewer',
  templateUrl: './leaderboard-viewer.component.html',
  styleUrls: ['./leaderboard-viewer.component.css']
})
export class LeaderboardViewerComponent implements OnInit {
  @Input() config;

  myScore$: Observable<any>;

  constructor(private readonly syncPollService: SyncPollService) {}

  ngOnInit() {
    this.myScore$ = this.syncPollService.calculateMyScore(
      this.config.filter(a => a.answer)
    );
  }
}
