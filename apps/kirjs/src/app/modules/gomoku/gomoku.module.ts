import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../libs/presentation/src/lib/slide-routes';

import { ExerciseModule } from '../../../../../../libs/exercise/src/lib/exercise.module';
import { PresentationModule } from '../../../../../../libs/presentation/src/lib/presentation.module';
import { FeedbackModule } from '../../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserWindowModule } from '../../../../../../libs/browser/src/lib/browser.module';

import { GomokuComponent } from './gomoku.component';
import { TooltipsModule } from '../../../../../../libs/tooltips/src/lib/tooltips.module';
import { FakeBabelModule } from '../../../../../../libs/exercise/src/lib/fake-babel-runner/fake-babel-runner.module';
import { CommonModule } from '@angular/common';
import { GomokuBoardModule } from './board/board.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(GomokuComponent)
);

@NgModule({
  imports: [
    routes,
    PresentationModule,
    ExerciseModule,
    BrowserWindowModule,
    FeedbackModule,

    CommonModule,
    TooltipsModule,
    FakeBabelModule,
    GomokuBoardModule
  ],
  declarations: [GomokuComponent],
  exports: [GomokuComponent]
})
export class GomokuModule {

}
