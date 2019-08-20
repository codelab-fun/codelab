import { Injectable } from '@angular/core';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';
import { distinctUntilChanged, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { interval, Observable } from 'rxjs';
import produce from 'immer';
import { database } from 'firebase/app';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';

const defaultPresenterSettings = {
  enabled: true,
  startTime: 0,
};

export class SyncPoll {
  key = 'poll' + '/' + this.config.key;

  readonly presenterSettings = this.syncDataService
    .getPresenterObject(this.key, defaultPresenterSettings);
  readonly isPollEnabled$ = this.presenterSettings.valueChanges().pipe(map(a => a.enabled));
  readonly timestamp$: Observable<number> = this.presenterSettings.valueChanges().pipe(map(a => a.startTime));

  readonly timeLeft$ = this.timestamp$.pipe(
    switchMap(time => interval(500).pipe(map(() => time))),
    withLatestFrom(this.syncDbService.offset$.pipe(distinctUntilChanged())),
    map(([time, offset]) => Math.round(Math.max(0, time + 1000 * (this.config.time || 20) - Date.now() + offset) / 1000)),
    distinctUntilChanged()
  );

  readonly $isPollRunning = this.timeLeft$.pipe(
    tap(tm => console.log({tm})),
    map(time => time > 0)
  );

  readonly hasVotes$: Observable<boolean>;
  private readonly viewerData = this.syncDataService.getCurrentViewerObject(this.key, null);
  readonly myVote$ = this.viewerData.valueChanges().pipe(map(a => {
    return a;
  }));
  private readonly votesData = this.syncDataService.getAdminAllUserData(this.key, {});
  readonly votes$ = this.votesData.valueChanges();

  constructor(private readonly syncDataService: SyncDataService,
              private readonly config: SyncPollConfig,
              private readonly syncDbService: SyncDbService) {
    // Reformattin breaks this if it's out of the constructor.
    this.hasVotes$ = this.votes$.pipe(map(v => Object.keys(v).length > 0));
  }

  vote(answer: number) {
    this.viewerData.set(answer);
  }

  start() {
    this.presenterSettings.updateWithCallback(produce((settings) => {
      settings.startTime = database.ServerValue.TIMESTAMP;
    }));

  }
}

@Injectable({
  providedIn: 'root'
})
export class SyncPollService {
  constructor(private readonly syncDataService: SyncDataService,
              private readonly syncDbService: SyncDbService) {
  }

  getPoll(config: SyncPollConfig) {
    return new SyncPoll(this.syncDataService, config, this.syncDbService);
  }
}
