import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { RxjsComponent } from './rxjs.component';

const routes = RouterModule.forChild(
  SlidesRoutes.get(RxjsComponent)
);




@NgModule({
  declarations: [RxjsComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes
  ]
})
export class RxjsModule { }
