import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncComponent } from './sync.component';
import { SlidesModule } from '@codelab/slides';
import { SyncPollModule } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.module';

@NgModule({
  declarations: [SyncComponent],
  exports: [SyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    SyncPollModule,
  ]
})
export class SyncModule {
}
