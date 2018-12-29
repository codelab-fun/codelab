import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { SlidesModule } from '../../../../../../../libs/slides/src';


const routes = RouterModule.forChild(
  SlidesRoutes.get(EmptyComponent)
);

@NgModule({
  imports: [
    routes,
    SlidesModule,
    CommonModule
  ],
  declarations: [EmptyComponent],
  exports: [EmptyComponent]
})
export class EmptyModule {
}
