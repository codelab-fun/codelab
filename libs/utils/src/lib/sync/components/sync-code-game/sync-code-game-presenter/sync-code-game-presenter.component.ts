import { Component } from '@angular/core';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';
import { SyncCodeGameService } from '@codelab/utils/src/lib/sync/components/sync-code-game/sync-code-game.service';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-sync-code-game-presenter',
  templateUrl: './sync-code-game-presenter.component.html',
  styleUrls: ['./sync-code-game-presenter.component.css']
})
export class SyncCodeGamePresenterComponent {
  readonly selectedUserSubject = new Subject<string>();

  constructor(
    readonly codeGameService: SyncCodeGameService,
    readonly registrationService: SyncRegistrationService
  ) {}

  selectedUser$ = combineLatest([
    this.codeGameService.allStatuses$,
    this.selectedUserSubject
  ]).pipe(
    map(([users, user]) => {
      return users.find(u => u.name === user);
    })
  );
}
