import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SyncIsAdminDirective,
  SyncIsOffDirective,
  SyncIsPresentingDirective,
  SyncIsViewingDirective
} from "./is-status.directive";
import { SyncUserValueDirective } from "./sync-user-value.directive";
import { SyncPresenterValueDirective } from "./sync-presenter-value.directive";
import { SyncViewerValueDirective } from "./sync-viewer-value.directive";

@NgModule({
  declarations: [
    SyncIsViewingDirective,
    SyncIsPresentingDirective,
    SyncIsAdminDirective,
    SyncPresenterValueDirective,
    SyncViewerValueDirective,
    SyncIsOffDirective,
    SyncUserValueDirective,
  ],
  exports: [
    SyncIsViewingDirective,
    SyncIsPresentingDirective,
    SyncIsAdminDirective,
    SyncPresenterValueDirective,
    SyncViewerValueDirective,
    SyncIsOffDirective,
    SyncUserValueDirective,
  ],
  imports: [CommonModule],
})
export class SyncDirectivesModule {}
