import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  styleUrls: ['./sync-poll.component.css']
})
export class SyncPollComponent implements OnInit {

  @Input() poll: Poll;
  values: Observable<any | null>;
  config$: Observable<any | null>;
  isRunning$: Observable<any | null>;

  constructor(private readonly syncService: SyncService<any>,
              private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.values = this.syncService.getViewerValue(this.poll.key);
    this.config$ = this.syncService.getPresenterValue(this.poll.key);
    this.isRunning$ = this.config$.pipe(map(config => config && config.running));
  }

  vote(i: number) {
    this.syncService.updateViewerValue(this.poll.key, i);
  }
}
