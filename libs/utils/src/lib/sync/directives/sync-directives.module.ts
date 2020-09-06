import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SyncIsAdminDirective,
  SyncIsPresentingDirective,
  SyncIsViewingDirective,
  SyncIsOffDirective
} from '@codelab/utils/src/lib/sync/directives/is-status.directive';
import { SyncPresenterValueDirective } from '@codelab/utils/src/lib/sync/directives/sync-presenter-value.directive';
import { SyncViewerValueDirective } from '@codelab/utils/src/lib/sync/directives/sync-viewer-value.directive';
import { SyncUserValueDirective } from '@codelab/utils/src/lib/sync/directives/sync-user-value.directive';

@NgModule({
  declarations: [
    SyncIsViewingDirective,
    SyncIsPresentingDirective,
    SyncIsAdminDirective,
    SyncPresenterValueDirective,
    SyncViewerValueDirective,
    SyncIsOffDirective,
    SyncUserValueDirective
  ],
  exports: [
    SyncIsViewingDirective,
    SyncIsPresentingDirective,
    SyncIsAdminDirective,
    SyncPresenterValueDirective,
    SyncViewerValueDirective,
    SyncIsOffDirective,
    SyncUserValueDirective
  ],
  imports: [CommonModule]
})
export class SyncDirectivesModule {}
