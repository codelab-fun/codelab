import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { StackComponent } from './stack.component';
import { StackGameComponent } from './stack-game/stack-game.component';

const routes = RouterModule.forChild(SlidesRoutes.get(StackComponent));

@NgModule({
  declarations: [StackComponent, StackGameComponent],
  imports: [CommonModule, SlidesModule, routes]
})
export class StackModule {}
