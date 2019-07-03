import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { StackComponent } from './stack.component';
import { StackGameComponent } from './stack-game/stack-game.component';
import { SimpleStackComponent } from './simple-stack/simple-stack.component';
import { StackTestComponent } from './stack-test/stack-test.component';
import { StackPushPopPracticeComponent } from './stack-push-pop-practice/stack-push-pop-practice.component';
import { StackFunctionComponent } from './stack-game/stack-function/stack-function.component';

const routes = RouterModule.forChild(
  SlidesRoutes.get(StackComponent)
);


@NgModule({
  declarations: [StackComponent, StackGameComponent, SimpleStackComponent, StackTestComponent, StackPushPopPracticeComponent, StackFunctionComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes
  ]
})
export class StackModule { }
