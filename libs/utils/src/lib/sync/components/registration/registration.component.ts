import { Component } from '@angular/core';
import { RegistrationService } from '@codelab/utils/src/lib/sync/components/registration/registration.service';

@Component({
  selector: 'slides-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService],
})
export class RegistrationComponent {


}
