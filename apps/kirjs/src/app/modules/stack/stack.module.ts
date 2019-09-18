import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { StackComponent } from './stack.component';
import { StackGameComponent } from './stack-game/stack-game.component';
import { SimpleStackComponent } from './simple-stack/simple-stack.component';
import { StackTestComponent } from './stack-test/stack-test.component';
import { StackFunctionComponent } from './stack-game/stack-function/stack-function.component';
import { StackFunctionButtonComponent } from './stack-game/stack-function-button/stack-function-button.component';
import { MatButtonModule } from '@angular/material';

const routes = RouterModule.forChild(
  SlidesRoutes.get(StackComponent)
);


@NgModule({
  declarations: [StackComponent,
    StackGameComponent, SimpleStackComponent, StackTestComponent, StackFunctionComponent, StackFunctionButtonComponent],
  imports: [
    CommonModule,
    SlidesModule,
    MatButtonModule,
    routes
  ]
})
export class StackModule {
}
