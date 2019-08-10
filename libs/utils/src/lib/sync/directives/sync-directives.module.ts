import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SyncIsAdminDirective,
  SyncIsPresentingDirective,
  SyncIsViewingDirective
} from '@codelab/utils/src/lib/sync/directives/is-status.directive';

@NgModule({
  declarations: [
    SyncIsViewingDirective,
    SyncIsPresentingDirective,
    SyncIsAdminDirective
  ],
  exports: [
    SyncIsViewingDirective,
    SyncIsPresentingDirective,
    SyncIsAdminDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SyncDirectivesModule { }
