import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { RouterModule } from '@angular/router';
import { SyncModule as SyncLibModule, SyncSessionsComponent } from '@codelab/utils';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SyncComponent } from './sync.component';

const routes = RouterModule.forChild([
  { path: 'sessions', component: SyncSessionsComponent },
  ...SlidesRoutes.get(SyncComponent),
]);

@NgModule({
  declarations: [SyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes,
    SyncLibModule,
    AngularFireAuthModule,
  ],
})
export class SyncModule {}
