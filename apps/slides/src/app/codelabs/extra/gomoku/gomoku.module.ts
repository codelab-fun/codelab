import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/slides/src/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { SlidesModule } from '../../../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { GomokuComponent } from './gomoku.component';
import { TooltipsModule } from '../../../tooltips/tooltips.module';
import { FakeBabelModule } from '../../../exercise/fake-babel-runner/fake-babel-runner.model';
import { CommonModule } from '@angular/common';
import { GomokuBoardModule } from './board/board.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(GomokuComponent)
);

@NgModule({
  imports: [
    routes,
    SlidesModule,
    ExerciseModule,
    BrowserWindowModule,
    FeedbackModule,
    RunnersModule,
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
