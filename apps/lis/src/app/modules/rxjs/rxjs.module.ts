import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '@codelab/code-demos';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { SyncPollModule } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.module';
import { SyncRegistrationModule } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.module';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { SyncButtonModule } from '@codelab/utils/src/lib/sync/sync-button/sync-button.module';
import { RxjsComponent } from './rxjs.component';

const routes = RouterModule.forChild(SlidesRoutes.get(RxjsComponent));

@NgModule({
  declarations: [RxjsComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes,
    CodeDemoModule,
    FormsModule,
    SyncButtonModule,
    SyncRegistrationModule,
    SyncPollModule,
    SyncDirectivesModule
  ]
})
export class RxjsModule {}
