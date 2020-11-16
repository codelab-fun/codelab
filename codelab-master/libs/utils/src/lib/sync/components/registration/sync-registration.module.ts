import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrationComponent } from '@codelab/utils/src/lib/sync/components/registration/registration.component';
import { RegistrationViewerComponent } from '@codelab/utils/src/lib/sync/components/registration/registration-viewer/registration-viewer.component';
import { RegistrationPresenterComponent } from '@codelab/utils/src/lib/sync/components/registration/registration-presenter/registration-presenter.component';
import { RegistrationAdminComponent } from '@codelab/utils/src/lib/sync/components/registration/registration-admin/registration-admin.component';
import { FormsModule } from '@angular/forms';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { SyncJoinInstructionsModule } from '@codelab/utils/src/lib/sync/components/sync-join-instructions/sync-join-instructions.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationViewerComponent,
    RegistrationAdminComponent,
    RegistrationPresenterComponent
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
    MatButtonModule
  ]
})
export class SyncRegistrationModule {}
