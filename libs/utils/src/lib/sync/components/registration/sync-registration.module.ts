import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '@codelab/utils/src/lib/sync/components/registration/registration.component';
import { RegistrationViewerComponent } from '@codelab/utils/src/lib/sync/components/registration/registration-viewer/registration-viewer.component';
import { RegistrationPresenterComponent } from '@codelab/utils/src/lib/sync/components/registration/registration-presenter/registration-presenter.component';
import { RegistrationAdminComponent } from '@codelab/utils/src/lib/sync/components/registration/registration-admin/registration-admin.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { SyncJoinInstructionsModule } from '@codelab/utils/src/lib/sync/components/sync-join-instructions/sync-join-instructions.module';

@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationViewerComponent,
    RegistrationAdminComponent,
    RegistrationPresenterComponent
  ],
  exports: [
    RegistrationComponent
  ],
  imports: [
    SyncJoinInstructionsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    SyncDirectivesModule,
  ]
})
export class SyncRegistrationModule {
}
