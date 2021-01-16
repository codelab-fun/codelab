import { Injectable } from '@angular/core';

import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import {
  SyncDataObject,
  SyncDbService
} from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { FirebaseDb } from '@codelab/utils/src/lib/sync/services/common';
import { QuestionDb } from '@codelab/utils/src/lib/sync/components/questions/common/common';

interface PresenterPollConfig {
  enabled: boolean;
  startTime: number;
}

export interface UserVotes {
  [key: string]: number;
}

interface ViewerPollConfig {
  answer: number;
  time: number;
}

export interface PresenterConfig {
  qna7: {
    requireApproval: boolean;
    starredQuestionKey: string;
  };
  poll: { [pollId: string]: PresenterPollConfig };
  registration: {
    shouldDisplayNames: boolean;
    joinUrl: string;
    isRegistrationEnabled: boolean;
  };
  enabled: boolean;
  currentSlide: number;
  'poll-timing': number;
}

interface PollConfig {
  [pollId: string]: ViewerPollConfig;
}

export interface CodingSession {
  code: string;
  score: number;
  maxScore: number;
}

export interface CodingSessions {
  [key: string]: CodingSession;
}

export interface ViewerConfig {
  poll: { [viewer: string]: PollConfig };
  name: { [viewer: string]: string };
  qna7: { [viewer: string]: { questions: QuestionDb[] } };
  votes: { [viewer: string]: UserVotes };
  coding: { [viewer: string]: CodingSessions };
}

export interface SyncSessionConfig {
  autojoin: boolean;
  active: boolean;
  admins: string[];
  owner: string;
  name: string;
}

export interface SyncSession {
  presenter: PresenterConfig;
  viewer: ViewerConfig;
  config: SyncSessionConfig;
}

export interface SyncDb extends FirebaseDb {
  'sync-sessions': { [key: string]: SyncSession };
  authorized_users: { [uid: string]: boolean };
  admin: { [uid: string]: { permissions: { [permission: string]: boolean } } };
  'user-data': {
    [userId: string]: {
      [key: string]: {
        valueKey: any;
      };
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class SyncDataService {
  private readonly syncId$: Observable<
    string
  > = this.syncSessionService.sessionId$.pipe(filter(a => !!a));
  private readonly currentSession$ = this.dbService
    .object('sync-sessions')
    .object(this.syncId$);

  constructor(
    private readonly syncSessionService: SyncSessionService,
    private readonly dbService: SyncDbService<SyncDb>
  ) {}

  getPresenterObject<K extends keyof PresenterConfig>(key: K) {
    return this.currentSession$.object('presenter').object(key);
  }

  getCurrentViewerObject<K extends keyof ViewerConfig>(key: K) {
    return this.getViewerObject(
      key,
      this.syncSessionService.viewerId$.pipe(filter(a => !!a))
    );
  }

  getViewerObject<K extends keyof ViewerConfig>(
    key: K,
    viewerId: Observable<string> | string
  ) {
    return this.currentSession$
      .object('viewer')
      .object(key)
      .object(viewerId);
  }

  getAdminAllUserData<K extends keyof ViewerConfig>(
    key: K
  ): SyncDataObject<ViewerConfig[K]> {
    return this.currentSession$.object('viewer').object(key);
  }
}
