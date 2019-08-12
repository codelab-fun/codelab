import { Component, Input } from '@angular/core';
import { SyncPollService } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';

export interface Poll {
  key: string;
  question: string;
  answers: string[];
}

/**
 * Coming soon.
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-poll',
  templateUrl: './sync-poll.component.html',
  styleUrls: ['./sync-poll.component.css'],
  providers: [
    SyncPollService,
  ],
})
export class SyncPollComponent {
  // private readonly valuesObject = this.syncDataService.getCurrentViewerObject('config');
  // private readonly config = this.syncDataService.getCurrentViewerObject('config');
  //
  @Input() poll: Poll;
  // // values: Observable<any | null>;
  // // config$: Observable<any | null>;
  // // isRunning$: Observable<any | null>;
  //
  // constructor() {
  // }
  //
  // ngOnInit() {
  //   // this.values = this.syncService.getCurrentViewerValue(this.config.key);
  //   // this.config$ = this.syncService.getPresenterValue(this.config.key);
  //   // this.isRunning$ = this.config$.pipe(map(config => config && config.running));
  // }
  //
  // vote(i: number) {
  //   // this.syncService.updateViewerValue(this.config.key, i);
  // }
}
