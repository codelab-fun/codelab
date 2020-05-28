import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { RouterModule } from '@angular/router';
import { SyncModule as SyncLibModule } from '@codelab/utils/src/lib/sync/sync.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SyncSessionsComponent } from '@codelab/utils/src/lib/sync/components/sync-sessions/sync-sessions.component';
import { SyncComponent } from './sync.component';

const routes = RouterModule.forChild([
  { path: 'sessions', component: SyncSessionsComponent },
  ...SlidesRoutes.get(SyncComponent)
]);

@NgModule({
  declarations: [SyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes,
    SyncLibModule,
    AngularFireAuthModule
  ]
})
export class SyncModule {}
