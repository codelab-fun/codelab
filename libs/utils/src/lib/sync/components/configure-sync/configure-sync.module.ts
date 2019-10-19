import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfigureSyncComponent } from './configure-sync.component';
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
