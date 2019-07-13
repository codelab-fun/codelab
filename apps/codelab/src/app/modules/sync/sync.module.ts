import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { SyncComponent } from './sync.component';

const routes = RouterModule.forChild(
  SlidesRoutes.get(SyncComponent)
);


@NgModule({
  declarations: [SyncComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes
  ]
})
export class SyncModule { }
