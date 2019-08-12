import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncButtonComponent } from '@codelab/utils/src/lib/sync/sync-button/sync-button.component';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [SyncButtonComponent],
  exports: [SyncButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SyncDirectivesModule,
  ]
})
export class SyncButtonModule {
}
