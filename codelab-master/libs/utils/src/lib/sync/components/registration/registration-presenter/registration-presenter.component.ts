import { Component } from '@angular/core';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';

@Component({
  selector: 'codelab-registration-presenter',
  templateUrl: './registration-presenter.component.html',
  styleUrls: ['./registration-presenter.component.css']
})
export class RegistrationPresenterComponent {
  constructor(readonly registrationService: SyncRegistrationService) {}
}
