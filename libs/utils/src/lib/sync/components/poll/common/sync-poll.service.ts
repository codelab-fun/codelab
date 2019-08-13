import { Injectable } from '@angular/core';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


export class SyncPoll {
  key = 'poll' + '/' + this.config.key;

  readonly isPollEnabled$ = this.syncDataService
    .getPresenterObject(this.key, true)
    .valueChanges();

  readonly hasVotes$: Observable<boolean>;
  private readonly viewerData = this.syncDataService.getCurrentViewerObject(this.key, null);
  readonly myVote$ = this.viewerData.valueChanges().pipe(map(a => {
    return a;
  }));
  private readonly votesData = this.syncDataService.getAdminAllUserData(this.key, {});
  readonly votes$ = this.votesData.valueChanges();

  constructor(private readonly syncDataService: SyncDataService, private readonly config: SyncPollConfig) {
    this.syncDataService
      .getPresenterObject(this.key, true)
      .valueChanges().pipe(tap(a => {
    }));

    // Reformattin breaks this if it's out of the constructor.
    this.hasVotes$ = this.votes$.pipe(map(v => Object.keys(v).length > 0));
  }

  vote(answer: string) {
    this.viewerData.set(answer);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SyncPollService {
  constructor(private readonly syncDataService: SyncDataService) {
  }

  getPoll(config: SyncPollConfig) {
    return new SyncPoll(this.syncDataService, config);
  }
}
