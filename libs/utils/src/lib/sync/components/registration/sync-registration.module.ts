import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { RegistrationComponent } from '@codelab/utils/src/lib/sync/components/registration/registration.component';
import { RegistrationViewerComponent } from '@codelab/utils/src/lib/sync/components/registration/registration-viewer/registration-viewer.component';
import { RegistrationPresenterComponent } from '@codelab/utils/src/lib/sync/components/registration/registration-presenter/registration-presenter.component';
import { RegistrationAdminComponent } from '@codelab/utils/src/lib/sync/components/registration/registration-admin/registration-admin.component';
import { FormsModule } from '@angular/forms';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { SyncJoinInstructionsModule } from '@codelab/utils/src/lib/sync/components/sync-join-instructions/sync-join-instructions.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
