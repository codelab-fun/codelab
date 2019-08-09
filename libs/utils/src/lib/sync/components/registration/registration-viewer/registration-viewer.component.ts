import { Component, Input } from '@angular/core';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { RegistrationService } from '@codelab/utils/src/lib/sync/components/registration/registration.service';

@Component({
  selector: 'slides-registration-viewer',
  templateUrl: './registration-viewer.component.html',
  styleUrls: ['./registration-viewer.component.css']
})
export class RegistrationViewerComponent {
  constructor(private readonly registrationService: RegistrationService) {
  }
}
