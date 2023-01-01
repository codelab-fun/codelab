import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrationComponent } from './registration.component';
import { RegistrationViewerComponent } from './registration-viewer/registration-viewer.component';
import { RegistrationPresenterComponent } from './registration-presenter/registration-presenter.component';
import { RegistrationAdminComponent } from './registration-admin/registration-admin.component';
import { FormsModule } from '@angular/forms';
import { SyncDirectivesModule } from '../../directives/sync-directives.module';
import { SyncJoinInstructionsModule } from '../sync-join-instructions/sync-join-instructions.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationViewerComponent,
    RegistrationAdminComponent,
    RegistrationPresenterComponent,
  ],
  exports: [RegistrationComponent],
  imports: [
    SyncJoinInstructionsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    SyncDirectivesModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class SyncRegistrationModule {}
