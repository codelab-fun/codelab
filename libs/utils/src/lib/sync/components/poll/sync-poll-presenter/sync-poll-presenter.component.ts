import { Component, Input, OnInit } from '@angular/core';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';
import { SyncPoll, SyncPollService } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';

@Component({
  selector: 'slides-sync-poll-presenter',
  templateUrl: './sync-poll-presenter.component.html',
  styleUrls: ['./sync-poll-presenter.component.css']
})
export class SyncPollPresenterComponent implements OnInit {


  @Input() config: SyncPollConfig;
  private poll: SyncPoll;
  constructor(private readonly pollService: SyncPollService) { }

  ngOnInit() {
    this.poll = this.pollService.getPoll(this.config);
  }
  // readonly allUserValues = new Subject();
  // private config$: Observable<any | null>;
  // private isRunning$: Observable<boolean>;
  //
  // constructor(private readonly syncService: SyncService<any>,
  //             private readonly cdr: ChangeDetectorRef) {
  // }
  //
  // ngOnInit() {
  //   this.config$ = this.syncService.getPresenterValue(this.config.key);
  //   this.isRunning$ = this.config$.pipe(map(config => {
  //     return config && config.running;
  //   }));
  //   this.syncService.getAllViewersValues(this.config.key)
  //     .pipe(map((data ) => {
  //       data = data || {};
  //       const breakup = Object.values(data).reduce((result, value) => {
  //         result[value] = (result[value] || 0) + 1;
  //         return result;
  //       }, {});
  //       return Object.entries(breakup).map(([key, value]) => ({key, value}));
  //     }))
  //     .subscribe(this.allUserValues);
  // }
  //
}
