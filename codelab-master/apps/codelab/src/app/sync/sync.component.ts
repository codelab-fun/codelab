import { Component, Input } from '@angular/core';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { switchMap } from 'rxjs/operators';
import {
  canWritePresenterData,
  SyncStatus
} from '@codelab/utils/src/lib/sync/common';
import { of } from 'rxjs';

@Component({
  selector: 'codelab-sync-survey',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent {
  @Input() admin = false;
  readonly userId$ = this.syncSessionService.viewerId$;

  readonly isPresentationEnabled$ = this.syncDataService
    .getPresenterObject('enabled')
    .withDefault(false)
    .valueChanges();

  readonly shouldShowPresentation$ = this.syncSessionService.status$.pipe(
    switchMap(s => {
      if (canWritePresenterData(s)) {
        return of(true);
      }

      if (s === SyncStatus.OFF) {
        return this.admin
          ? this.syncSessionService.canStartSession$
          : of(false);
      }

      return this.isPresentationEnabled$;
    })
  );

  polls: SyncPollConfig[] = [
    {
      key: 'js',
      type: 'stars',
      question: 'How well do you know JavaScript'
    },
    {
      key: 'ts',
      type: 'stars',
      question: 'How well do you know TypeScript'
    },
    {
      key: 'angularjs',
      type: 'stars',
      question: 'How well do you know AngularJS (Old version)'
    },
    {
      key: 'angular',
      type: 'stars',
      question:
        'How well do you know Angular (The new version we are learning today)'
    }
  ];

  constructor(
    private readonly syncDataService: SyncDataService,
    private readonly syncSessionService: SyncSessionService
  ) {}
}
