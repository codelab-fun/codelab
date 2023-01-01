import { Component, Input, OnInit } from '@angular/core';
import { SyncPollConfig } from '../common/common';
import {
  SyncPoll,
  SyncPollService,
} from '../common/sync-poll.service';

@Component({
  selector: 'codelab-sync-poll-presenter',
  templateUrl: './sync-poll-presenter.component.html',
  styleUrls: ['./sync-poll-presenter.component.css'],
})
export class SyncPollPresenterComponent implements OnInit {
  @Input() config: SyncPollConfig;
  poll: SyncPoll;

  constructor(private readonly pollService: SyncPollService) {}

  getAnswerIndex() {
    return this.config.options.indexOf(this.config.answer);
  }

  ngOnInit() {
    this.poll = this.pollService.getPoll(this.config);
  }
}
