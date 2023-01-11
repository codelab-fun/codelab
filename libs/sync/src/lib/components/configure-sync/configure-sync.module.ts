import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfigureSyncComponent } from './configure-sync.component';
import { FormsModule } from '@angular/forms';
import { SyncDirectivesModule } from '../../directives/sync-directives.module';

@NgModule({
  declarations: [ConfigureSyncComponent],
  exports: [ConfigureSyncComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    SyncDirectivesModule,
    FormsModule,
  ],
})
export class ConfigureSyncModule {}
