import { Component, Input, OnInit } from '@angular/core';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';
import {
  SyncPoll,
  SyncPollService
} from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';

@Component({
  selector: 'codelab-sync-poll-viewer',
  templateUrl: './sync-poll-viewer.component.html',
  styleUrls: ['./sync-poll-viewer.component.css']
})
export class SyncPollViewerComponent implements OnInit {
  @Input() config: SyncPollConfig;
  stars: string;
  poll: SyncPoll;

  constructor(private readonly pollService: SyncPollService) {}

  ngOnInit() {
    this.poll = this.pollService.getPoll(this.config);
  }
}
