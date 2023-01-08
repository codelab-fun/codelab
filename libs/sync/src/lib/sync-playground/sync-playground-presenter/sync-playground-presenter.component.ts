import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import { ReplaySubject, Subject } from 'rxjs';
import { SyncSessionService } from "../../services/sync-session.service";
import { SyncCodeGameService } from "../../components/sync-code-game/sync-code-game.service";
import { SyncRegistrationService } from "../../components/registration/sync-registration.service";
import { SyncPollService } from "../../components/poll/common/sync-poll.service";
import { SyncDataService } from "../../services/sync-data.service";
import { SyncDbService } from '../../services/sync-db.service';
import { SyncStatus } from '../../common';
import firebase from 'firebase/compat/app';
import { TestRunnerService } from '@codelab/sandbox-runner';

@Component({
  selector: 'codelab-sync-playground-presenter',
  templateUrl: './sync-playground-presenter.component.html',
  styleUrls: ['./sync-playground-presenter.component.css'],
  providers: [
    TestRunnerService,
    SyncDataService,
    SyncSessionService,
    SyncDbService,
    SyncPollService,
    SyncRegistrationService,
    SyncCodeGameService,
    {
      provide: LoginService,
      useFactory: () => ({
        uid$: new ReplaySubject<string>(1),
        user$: new ReplaySubject<any>(1),
        preferredStatus$: new ReplaySubject<any>(1),
      }),
    },
  ],
})
export class SyncPlaygroundPresenterComponent implements OnInit {
  @Input() userId: string;
  @Input() preferredStatus: SyncStatus;

  constructor(
    private readonly syncSessionService: SyncSessionService,
    private readonly loginService: LoginService) {}

  ngOnInit() {
    (this.loginService.user$ as Subject<firebase.User>).next({
      uid: this.userId,
      displayName: 'lol',
    } as firebase.User);

    (this.loginService.uid$ as Subject<string>).next(this.userId);
    (this.syncSessionService.preferredStatus$ as Subject<string>).next(
      this.preferredStatus
    );
  }
}
