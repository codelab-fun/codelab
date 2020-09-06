import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { SyncPollModule } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.module';
import { SyncButtonModule } from '@codelab/utils/src/lib/sync/sync-button/sync-button.module';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { ConfigureSyncModule } from '@codelab/utils/src/lib/sync/components/configure-sync/configure-sync.module';
import { SyncComponent } from './sync.component';

@NgModule({
  declarations: [SyncComponent],
  exports: [SyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    SyncPollModule,
    SyncButtonModule,
    SyncDirectivesModule,
    ConfigureSyncModule
  ]
})
export class SyncModule {}

@Component({
  selector: 'codelab-sync-admin-wrapper',
  template: '<codelab-sync-survey [admin]="true"></codelab-sync-survey>'
})
export class SyncAdminWrapperComponent {}

const routes = RouterModule.forChild(
  SlidesRoutes.get(SyncAdminWrapperComponent)
);

@NgModule({
  declarations: [SyncAdminWrapperComponent],
  imports: [SyncModule, routes]
})
export class SyncAdminModule {}
