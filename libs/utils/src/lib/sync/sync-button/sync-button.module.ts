import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncButtonComponent } from '@codelab/utils/src/lib/sync/sync-button/sync-button.component';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { OnlineIndicatorModule } from '@codelab/utils/src/lib/sync/components/online-indicator/online-indicator.module';
import { SyncRegistrationModule } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.module';

@NgModule({
  declarations: [SyncButtonComponent],
  exports: [SyncButtonComponent],
  imports: [
    CommonModule,
    OnlineIndicatorModule,
    MatButtonModule,
    SyncDirectivesModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    SyncRegistrationModule,
  ],
})
export class SyncButtonModule {}
