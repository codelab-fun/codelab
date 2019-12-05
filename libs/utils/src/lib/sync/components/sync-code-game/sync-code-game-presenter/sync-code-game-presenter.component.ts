import { Component } from '@angular/core';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-sync-code-game-presenter',
  templateUrl: './sync-code-game-presenter.component.html',
  styleUrls: ['./sync-code-game-presenter.component.css']
})
export class SyncCodeGamePresenterComponent {
  constructor(readonly registrationService: SyncRegistrationService) {}
}
