import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { RouterModule } from '@angular/router';
import { CodeSyncComponent } from './code-sync.component';
import { SyncButtonModule, SyncDirectivesModule } from '@codelab/utils';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

const routes = RouterModule.forChild(SlidesRoutes.get(CodeSyncComponent));

@NgModule({
  declarations: [CodeSyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes,
    SyncDirectivesModule,
    SyncButtonModule,
    AngularFireDatabaseModule,
  ],
})
export class CodeSyncModule {}
