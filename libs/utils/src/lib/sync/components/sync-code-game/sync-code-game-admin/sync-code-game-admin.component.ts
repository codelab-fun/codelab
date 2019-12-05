import { Component } from '@angular/core';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-sync-code-game-admin',
  templateUrl: './sync-code-game-admin.component.html',
  styleUrls: ['./sync-code-game-admin.component.css']
})
export class SyncCodeGameAdminComponent {
  constructor(readonly registrationService: SyncRegistrationService) {}
}
