import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@ng360/slides';
import { StackComponent } from './stack.component';
import { StackModule } from './stack.module';

const routes = RouterModule.forChild(SlidesRoutes.get(StackComponent));

@NgModule({
  imports: [StackModule, routes]
})
export class StackRoutingModule {}
