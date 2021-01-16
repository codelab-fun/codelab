import { Injectable } from '@angular/core';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { combineLatest, interval, Observable, of } from 'rxjs';
import produce from 'immer';
import { database } from 'firebase/app';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { toValuesAndKeys } from '@codelab/utils/src/lib/sync/common';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';
import { FirebaseInfoService } from '@codelab/utils/src/lib/sync/services/firebase-info.service';

const DEFAULT_TEST_TIME_SECONDS = 20;

export interface UserVote {
  answer: number;
  time: number;
}

function getScore(
  isCorrect: boolean,
  range: number,
  speed: number,
  fastest: number
) {
  if (!isCorrect) {
    return 0;
  }

  if (range === 0) {
    return 1;
  }

  return 0.5 + ((range + fastest - speed) / range) * 0.5;
}

export function calculateUserScore(configs, presenterData, userData) {
  return configs
    .filter(config => presenterData[config.key])
    .map(config => {
      return {
        ...config,
        answerIndex: config.options.indexOf(config.answer),
        startTime: presenterData[config.key].startTime
      };
    })
    .flatMap(config => {
      if (!userData[config.key]) {
        return [];
      }

      const responses = Object.entries<UserVote>(userData[config.key]).map(
        ([user, answer]) => {
          const speed = answer.time - config.startTime;
          return {
            user,
            isCorrect:
              speed >= 0 &&
              answer.answer === config.answerIndex &&
              speed <= DEFAULT_TEST_TIME_SECONDS * 1000,
            speed: speed
          };
        }
      );

      const correctResponses = responses.filter(r => r.isCorrect);
      const slowest = Math.max(...correctResponses.map(a => a.speed), 0);
      const fastest = Math.min(...correctResponses.map(a => a.speed), slowest);
      const range = slowest - fastest;
      return responses.map(r => {
        return {
          ...r,
          score: 100 * getScore(r.isCorrect, range, r.speed, fastest)
        };
      });
    })
    .reduce((result, record) => {
      result[record.user] = (result[record.user] || 0) + record.score;
      return result;
    }, {});
}

export class SyncPoll {
  readonly key = this.config.key;
  readonly presenterSettings = this.syncDataService
    .getPresenterObject('poll')
    .object(this.config.key)
    .withDefault({
      enabled: true,
      startTime: 0
    });

  readonly isPollEnabled$ = this.presenterSettings
    .valueChanges()
    .pipe(map(a => a.enabled));
  readonly timestamp$: Observable<
    number
  > = this.presenterSettings.valueChanges().pipe(map(a => a.startTime));

  readonly timeLeft$ = this.timestamp$.pipe(
    switchMap(time => interval(500).pipe(map(() => time))),
    withLatestFrom(
      this.firebaseInfoService.offset$.pipe(distinctUntilChanged())
    ),
    map(([time, offset]) =>
      Math.round(
        Math.max(
          0,
          time +
            1000 * (this.config.time || DEFAULT_TEST_TIME_SECONDS) -
            Date.now() +
            offset
        ) / 1000
      )
    ),
    distinctUntilChanged()
  );

  readonly $isPollRunning = this.timeLeft$.pipe(map(time => time > 0));
  readonly hasVotes$: Observable<boolean>;
  readonly votesCount$: Observable<number>;
  private readonly viewerData = this.syncDataService
    .getCurrentViewerObject('poll')
    .object(this.key)
    .withDefault({ answer: null, time: 0 });
  readonly myVote$ = this.viewerData.valueChanges().pipe(map(a => a.answer));
  private readonly votesData = this.syncDataService
    .getAdminAllUserData('poll')
    .object(this.key)
    .withDefault({});

  votes$ = this.votesData.valueChanges();

  constructor(
    private readonly syncDataService: SyncDataService,
    readonly config: SyncPollConfig,
    private readonly firebaseInfoService: FirebaseInfoService
  ) {
    // Reformatting breaks this if it's out of the constructor.
    this.hasVotes$ = this.votes$.pipe(map(v => Object.keys(v).length > 0));
    this.votesCount$ = this.votes$.pipe(
      map(votes => Object.values(votes).length)
    );
  }

  vote(answer: number) {
    this.viewerData.set({
      answer,
      time: database.ServerValue.TIMESTAMP as number
    });
  }

  start() {
    this.presenterSettings.updateWithCallback(
      produce(settings => {
        settings.startTime = database.ServerValue.TIMESTAMP;
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class SyncPollService {
  constructor(
    private readonly syncDataService: SyncDataService,
    private readonly syncSessionService: SyncSessionService,
    private readonly firebaseInfoService: FirebaseInfoService,
    private readonly registrationService: SyncRegistrationService
  ) {}

  getPoll(config: SyncPollConfig) {
    return new SyncPoll(this.syncDataService, config, this.firebaseInfoService);
  }

  calculateScores(syncPollConfigs: SyncPollConfig[]) {
    const presenterData$ = this.syncDataService
      .getPresenterObject('poll')
      .valueChanges()
      .pipe(filter(a => a !== null));
    const userData$ = this.syncDataService
      .getAdminAllUserData('poll')
      .valueChanges()
      .pipe(filter(a => a !== null));

    const result$ = combineLatest([
      of(syncPollConfigs),
      presenterData$,
      userData$
    ]).pipe(
      map(([configs, presenterData, userData]) =>
        calculateUserScore(configs, presenterData, userData)
      )
    );

    return combineLatest([result$, this.registrationService.usersMap$]).pipe(
      map(([results, users]) => {
        return Object.entries(users).reduce((result, [uid, name]) => {
          result[uid] = { name, score: results[uid] || 0 };
          return result;
        }, {});
      })
    );
  }

  calculateMyScore(syncPollConfigs: SyncPollConfig[]) {
    return combineLatest([
      this.calculateScores(syncPollConfigs),
      this.syncSessionService.viewerId$
    ]).pipe(
      map(([scoresObj, uid]) => {
        const scores = toValuesAndKeys<{ score: number; name: string }>(
          scoresObj
        ).sort((a, b) => b.value.score - a.value.score);
        const index = scores.findIndex(score => score.key === uid);

        if (index === -1) {
          return { place: 0, score: 0 };
        }

        return {
          place: index + 1,
          ...scores[index].value
        };
      })
    );
  }
}
