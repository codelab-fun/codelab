import { Injectable } from '@angular/core';
import { SyncDataService } from '@codelab/utils/src/lib/sync/sync-data.service';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';
import { map } from 'rxjs/operators';


export class SyncPoll {
  key = 'poll' + '/' + this.config.key;

  readonly isPollEnabled$ = this.syncDataService
    .getPresenterObject(this.key, true)
    .valueChanges();

  private readonly viewerData = this.syncDataService.getCurrentViewerObject(this.key);
  readonly myVote$ = this.viewerData.valueChanges();

  private readonly votesData = this.syncDataService.getAdminAllUserData(this.key, {});

  readonly votes$ = this.votesData.valueChanges().pipe(map(data => {
    const breakup = Object.values(data).reduce((result, value: string) => {
      result[value] = (result[value] || 0) + 1;
      return result;
    }, {} as { [k: string]: string });
    return Object.entries(breakup).map(([key, value]) => ({key, value}));
  }));


  constructor(private readonly syncDataService: SyncDataService, private readonly config: SyncPollConfig) {

  }

  vote(answer: string) {
    this.viewerData.update(answer);
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
