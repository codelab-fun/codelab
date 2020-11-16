import { Component } from '@angular/core';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';

@Component({
  selector: 'codelab-registration-viewer',
  templateUrl: './registration-viewer.component.html',
  styleUrls: ['./registration-viewer.component.css']
})
export class RegistrationViewerComponent {
  constructor(readonly registrationService: SyncRegistrationService) {}
}
