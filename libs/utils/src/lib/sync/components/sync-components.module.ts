import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncPollComponent } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.component';

@NgModule({
  declarations: [
    SyncPollComponent
  ],
  exports: [
    SyncPollComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SyncComponentsModule { }
