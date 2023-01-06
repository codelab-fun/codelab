import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SlidesModule, SlidesRoutes } from '@codelab/slides';
import { SyncComponent } from './sync.component';
import { ConfigureSyncModule, SyncButtonModule, SyncDirectivesModule, SyncPollModule } from '@codelab/sync';

@NgModule({
  declarations: [SyncComponent],
  exports: [SyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    SyncPollModule,
    SyncButtonModule,
    SyncDirectivesModule,
    ConfigureSyncModule,
  ],
})
export class SyncModule {}

@Component({
  selector: 'codelab-sync-admin-wrapper',
  template: '<codelab-sync-survey [admin]="true"></codelab-sync-survey>',
})
export class SyncAdminWrapperComponent {}

const routes = RouterModule.forChild(
  SlidesRoutes.get(SyncAdminWrapperComponent)
);

@NgModule({
  declarations: [SyncAdminWrapperComponent],
  imports: [SyncModule, routes],
})
export class SyncAdminModule {}
