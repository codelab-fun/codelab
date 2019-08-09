import { Component } from '@angular/core';
import { RegistrationService } from '@codelab/utils/src/lib/sync/components/registration/registration.service';

@Component({
  selector: 'slides-registration-admin',
  templateUrl: './registration-admin.component.html',
  styleUrls: ['./registration-admin.component.css']
})
export class RegistrationAdminComponent {

  constructor(private readonly registrationService: RegistrationService) {
  }


  drop(userId: string) {
    this.registrationService.drop(userId);
  }
}
