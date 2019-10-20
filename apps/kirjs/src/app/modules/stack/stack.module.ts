import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { StackComponent } from './stack.component';
import { StackGameComponent } from './stack-game/stack-game.component';
import { SimpleStackComponent } from './simple-stack/simple-stack.component';
import { StackTestComponent } from './stack-test/stack-test.component';
import { StackFunctionComponent } from './stack-game/stack-function/stack-function.component';
import { StackFunctionButtonComponent } from './stack-game/stack-function-button/stack-function-button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    StackComponent,
    StackGameComponent,
    SimpleStackComponent,
    StackTestComponent,
    StackFunctionComponent,
    StackFunctionButtonComponent
  ],
  exports: [
    StackComponent,
    StackGameComponent,
    SimpleStackComponent,
    StackTestComponent,
    StackFunctionComponent,
    StackFunctionButtonComponent
  ],
  imports: [CommonModule, SlidesModule, MatButtonModule]
})
export class StackModule {}
