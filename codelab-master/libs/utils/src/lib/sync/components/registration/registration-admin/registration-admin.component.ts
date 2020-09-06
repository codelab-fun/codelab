import { Component } from '@angular/core';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';

@Component({
  selector: 'codelab-registration-admin',
  templateUrl: './registration-admin.component.html',
  styleUrls: ['./registration-admin.component.css']
})
export class RegistrationAdminComponent {
  url: string;
  displayNames: boolean;
  isRegistrationEnabled: boolean;

  constructor(readonly registrationService: SyncRegistrationService) {}

  drop(userId: string) {
    this.registrationService.drop(userId);
  }
}
