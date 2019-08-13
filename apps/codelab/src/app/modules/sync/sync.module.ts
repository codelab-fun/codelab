import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncComponent } from './sync.component';
import { SlidesModule } from '@codelab/slides';
import { SyncPollModule } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.module';
import { SyncButtonModule } from '@codelab/utils/src/lib/sync/sync-button/sync-button.module';

@NgModule({
  declarations: [SyncComponent],
  exports: [SyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    SyncPollModule,
    SyncButtonModule,
  ]
})
export class SyncModule {
}
