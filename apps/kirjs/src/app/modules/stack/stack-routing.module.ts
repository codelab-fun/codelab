import { NgModule } from '@angular/core';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { StackComponent } from './stack.component';
import { StackModule } from './stack.module';

const routes = RouterModule.forChild(SlidesRoutes.get(StackComponent));

@NgModule({
  imports: [StackModule, routes]
})
export class StackRoutingModule {}
