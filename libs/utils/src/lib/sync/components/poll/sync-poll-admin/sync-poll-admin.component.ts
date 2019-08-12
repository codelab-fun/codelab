import { Component, Input, OnInit } from '@angular/core';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';

@Component({
  selector: 'slides-sync-poll-admin',
  templateUrl: './sync-poll-admin.component.html',
  styleUrls: ['./sync-poll-admin.component.css']
})
export class SyncPollAdminComponent implements OnInit {
  @Input() config: SyncPollConfig;
  pollEnabled: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
