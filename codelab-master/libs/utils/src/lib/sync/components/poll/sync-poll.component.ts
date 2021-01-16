import { Component, Input } from '@angular/core';
import { SyncPollService } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';

/**
 * Coming soon.
 */
@Component({
  selector: 'codelab-poll',
  templateUrl: './sync-poll.component.html',
  styleUrls: ['./sync-poll.component.css'],
  providers: [SyncPollService]
})
export class SyncPollComponent {
  @Input() poll: SyncPollConfig;
}
