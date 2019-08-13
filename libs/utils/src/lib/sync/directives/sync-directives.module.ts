import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SyncIsAdminDirective,
  SyncIsPresentingDirective,
  SyncIsViewingDirective
} from '@codelab/utils/src/lib/sync/directives/is-status.directive';
import { SyncPresenterValueDirective } from '@codelab/utils/src/lib/sync/directives/sync-presenter-value.directive';
import { SyncViewerValueDirective } from '@codelab/utils/src/lib/sync/directives/sync-viewer-value.directive';

@NgModule({
  declarations: [
    SyncIsViewingDirective,
    SyncIsPresentingDirective,
    SyncIsAdminDirective,
    SyncPresenterValueDirective,
    SyncViewerValueDirective,
  ],
  exports: [
    SyncIsViewingDirective,
    SyncIsPresentingDirective,
    SyncIsAdminDirective,
    SyncPresenterValueDirective,
    SyncViewerValueDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SyncDirectivesModule { }
