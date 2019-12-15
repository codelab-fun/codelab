import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import { ReplaySubject, Subject } from 'rxjs';
import { User } from 'firebase/app';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { SyncStatus } from '@codelab/utils/src/lib/sync/common';
import { SyncPollService } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';
import { TestRunnerService } from '@codelab/utils/src/lib/sandbox-runner/test-runner.service';
import { SyncCodeGameService } from '@codelab/utils/src/lib/sync/components/sync-code-game/sync-code-game.service';

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
        preferredStatus$: new ReplaySubject<any>(1)
      })
    }
  ]
})
export class SyncPlaygroundPresenterComponent implements OnInit {
  @Input() userId: string;
  @Input() preferredStatus: SyncStatus;

  constructor(private readonly loginService: LoginService) {}

  ngOnInit() {
    (this.loginService.user$ as Subject<User>).next({
      uid: this.userId,
      displayName: 'lol'
    } as User);

    (this.loginService.uid$ as Subject<string>).next(this.userId);
    (this.loginService.preferredStatus$ as Subject<string>).next(
      this.preferredStatus
    );
  }
}
