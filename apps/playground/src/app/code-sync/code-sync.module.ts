import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { CodeSyncComponent } from './code-sync.component';
import { SyncButtonModule } from '@codelab/utils/src/lib/sync/sync-button/sync-button.module';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const routes = RouterModule.forChild(SlidesRoutes.get(CodeSyncComponent));

@NgModule({
  declarations: [CodeSyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes,
    SyncDirectivesModule,
    SyncButtonModule,
    AngularFireDatabaseModule
  ]
})
export class CodeSyncModule {}
