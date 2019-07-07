import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'slides-sync-poll-presenter',
  templateUrl: './sync-poll-presenter.component.html',
  styleUrls: ['./sync-poll-presenter.component.css']
})
export class SyncPollPresenterComponent implements OnInit {
  @Input() poll: any;

  readonly allUserValues = new Subject();
  private config$: Observable<any | null>;
  private isRunning$: Observable<boolean>;

  constructor(private readonly syncService: SyncService<any>,
              private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.config$ = this.syncService.getPresenterValue(this.poll.key);
    this.isRunning$ = this.config$.pipe(map(config => {
      return config && config.running;
    }));
    this.syncService.getAllViewersValues(this.poll.key)
      .pipe(map((data ) => {
        data = data || {};
        const breakup = Object.values(data).reduce((result, value) => {
          result[value] = (result[value] || 0) + 1;
          return result;
        }, {});
        return Object.entries(breakup).map(([key, value]) => ({key, value}));
      }))
      .subscribe(this.allUserValues);
  }

  start() {
    this.syncService.updatePresenterValue({
      [this.poll.key]: {
        running: true
      }
    });
  }

  stop() {
    this.syncService.updatePresenterValue({
      [this.poll.key]: {
        running: false
      }
    });
  }
}
