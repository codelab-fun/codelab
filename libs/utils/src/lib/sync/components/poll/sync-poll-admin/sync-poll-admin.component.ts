import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { database } from 'firebase/app';
import {
  SyncPoll,
  SyncPollService
} from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';

@Component({
  selector: 'codelab-sync-poll-admin',
  templateUrl: './sync-poll-admin.component.html',
  styleUrls: ['./sync-poll-admin.component.css']
})
export class SyncPollAdminComponent implements OnInit, OnChanges {
  @Input() config: SyncPollConfig;

  pollEnabled: boolean;
  poll!: SyncPoll;
  private readonly timing = this.syncDataService.getPresenterObject(
    'poll-timing'
  );

  constructor(
    private readonly syncDataService: SyncDataService,
    private readonly pollService: SyncPollService
  ) {}

  ngOnChanges(changes) {
    if (changes.config && changes.config.currentValue) {
      this.timing
        .object(changes.config.currentValue.key)
        .set(database.ServerValue.TIMESTAMP);
    }
  }

  ngOnInit() {
    this.poll = this.pollService.getPoll(this.config);
  }

  start() {
    this.poll.start();
  }
}
