import { Component, Input } from '@angular/core';
import { SyncPollService } from './common/sync-poll.service';
import { SyncPollConfig } from './common/common';

/**
 * Coming soon.
 */
@Component({
  selector: 'codelab-poll',
  templateUrl: './sync-poll.component.html',
  styleUrls: ['./sync-poll.component.css'],
  providers: [SyncPollService],
})
export class SyncPollComponent {
  @Input() poll: SyncPollConfig;
}
