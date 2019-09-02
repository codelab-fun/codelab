import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncJoinInstructionsComponent } from './sync-join-instructions.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
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
export class SyncJoinInstructionsModule {
}
