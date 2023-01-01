import { Component } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SyncCodeGameService } from "../sync-code-game.service";
import { SyncRegistrationService } from "../../registration/sync-registration.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-sync-code-game-presenter',
  templateUrl: './sync-code-game-presenter.component.html',
  styleUrls: ['./sync-code-game-presenter.component.css'],
})
export class SyncCodeGamePresenterComponent {
  readonly selectedUserSubject = new Subject<string>();

  constructor(
    readonly codeGameService: SyncCodeGameService,
    readonly registrationService: SyncRegistrationService
  ) {}

  selectedUser$ = combineLatest([
    this.codeGameService.allStatuses$,
    this.selectedUserSubject,
  ]).pipe(
    map(([users, user]) => {
      return users.find((u) => u.name === user);
    })
  );
}
