import { Component } from '@angular/core';
import { SyncRegistrationService } from './sync-registration.service';

@Component({
  selector: 'codelab-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [SyncRegistrationService],
})
export class RegistrationComponent {}
