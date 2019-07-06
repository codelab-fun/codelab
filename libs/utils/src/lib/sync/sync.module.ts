import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncComponent } from './sync.component';
import { SyncButtonComponent } from './sync-button/sync-button.component';
import { MatButtonModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginService } from '@codelab/firebase-login';
import { SyncIsPresentingDirective } from './directives/sync-is-presenting.directive';
import { SyncIsViewingDirective } from '@codelab/utils/src/lib/sync/directives/sync-is-viewing.directive';
import { SyncPresenterValueDirective } from '@codelab/utils/src/lib/sync/directives/sync-presenter-value.directive';
import { SyncViewerValueDirective } from '@codelab/utils/src/lib/sync/directives/sync-viewer-value.directive';
import { AllViewerValuesDirective } from '@codelab/utils/src/lib/sync/directives/all-viewer-values.directive';
import { SyncPlaygroundComponent } from './sync-playground/sync-playground.component';
import { SyncPlaygroundPresenterComponent } from './sync-playground/sync-playground-presenter/sync-playground-presenter.component';
import { SyncPlaygroundTestComponent } from './sync-playground/sync-playground-test/sync-playground-test.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatMenuModule,
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
    SyncPlaygroundComponent,
    SyncPlaygroundPresenterComponent,
    SyncPlaygroundTestComponent,
  ],
  exports: [
    SyncComponent,
    SyncButtonComponent,
    SyncIsPresentingDirective,
    SyncIsViewingDirective,
    SyncPresenterValueDirective,
    SyncViewerValueDirective,
    AllViewerValuesDirective,
    SyncPlaygroundComponent,
  ],
})
export class SyncModule {
}
