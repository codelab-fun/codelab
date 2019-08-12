import { Component, Input } from '@angular/core';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';

@Component({
  selector: 'slides-registration-presenter',
  templateUrl: './registration-presenter.component.html',
  styleUrls: ['./registration-presenter.component.css']
})
export class RegistrationPresenterComponent {
  constructor(private readonly registrationService: SyncRegistrationService) {
  }

}
