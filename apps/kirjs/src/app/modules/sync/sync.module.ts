import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { SyncComponent } from './sync.component';
import { SyncModule as SyncLibModule } from '@codelab/utils/src/lib/sync/sync.module';
import { AngularFireAuthModule } from '@angular/fire/auth';

const routes = RouterModule.forChild(
  [
    // {path: 'sessions', component:}
    ...SlidesRoutes.get(SyncComponent)
  ]
);


@NgModule({
  declarations: [SyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes,
    SyncLibModule,
    AngularFireAuthModule,
  ]
})
export class SyncModule {
}
