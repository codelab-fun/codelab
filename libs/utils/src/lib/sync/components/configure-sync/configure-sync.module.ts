import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureSyncComponent } from './configure-sync.component';
import {
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule
} from '@angular/material';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfigureSyncComponent],
  exports: [ConfigureSyncComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    SyncDirectivesModule,
    FormsModule
  ]
})
export class ConfigureSyncModule {}
