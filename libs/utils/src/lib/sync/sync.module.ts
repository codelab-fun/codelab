import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncComponent } from './sync.component';
import { SyncButtonComponent } from './sync-button/sync-button.component';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginService } from '@codelab/firebase-login';
import { SyncIsPresentingDirective } from './directives/sync-is-presenting.directive';
import { SyncIsViewingDirective } from '@codelab/utils/src/lib/sync/directives/sync-is-viewing.directive';
import { SyncPresenterValueDirective } from '@codelab/utils/src/lib/sync/directives/sync-presenter-value.directive';
import { SyncViewerValueDirective } from '@codelab/utils/src/lib/sync/directives/sync-viewer-value.directive';
import { AllViewerValuesDirective } from '@codelab/utils/src/lib/sync/directives/all-viewer-values.directive';
import { SyncPollComponent } from './components/poll/sync-poll.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [SyncService, LoginService],
  declarations: [
    SyncComponent,
    SyncButtonComponent,
    SyncIsPresentingDirective,
    SyncIsViewingDirective,
    SyncPresenterValueDirective,
    SyncViewerValueDirective,
    AllViewerValuesDirective,
  ],
  exports: [
    SyncComponent, SyncButtonComponent,
    SyncIsPresentingDirective,
    SyncIsViewingDirective,
    SyncPresenterValueDirective,
    SyncViewerValueDirective,
    AllViewerValuesDirective,
  ],
})
export class SyncModule {
}
