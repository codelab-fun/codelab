import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SyncJoinInstructionsComponent } from './sync-join-instructions.component';
import { FormsModule } from '@angular/forms';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';

@NgModule({
  declarations: [SyncJoinInstructionsComponent],
  exports: [SyncJoinInstructionsComponent],
  imports: [
    CommonModule,
    SyncDirectivesModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class SyncJoinInstructionsModule {}
