import { Component } from '@angular/core';
import { SyncRegistrationService } from '../../registration/sync-registration.service';

@Component({

  selector: 'slides-sync-code-game-admin',
  templateUrl: './sync-code-game-admin.component.html',
  styleUrls: ['./sync-code-game-admin.component.css'],
})
export class SyncCodeGameAdminComponent {
  constructor(readonly registrationService: SyncRegistrationService) {}
}
