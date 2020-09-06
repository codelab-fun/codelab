import { Component } from '@angular/core';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';

@Component({
  selector: 'codelab-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [SyncRegistrationService]
})
export class RegistrationComponent {}
