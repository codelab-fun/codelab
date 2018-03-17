import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { GomokuComponent } from './gomoku.component';
import { TooltipsModule } from '../../../../../../../libs/tool-tips/src/tooltips.module';
import { FakeBabelModule } from '../../../exercise/fake-babel-runner/fake-babel-runner.model';
import { CommonModule } from '@angular/common';
import { GomokuBoardModule } from './board/board.module';

const routes = RouterModule.forChild(SlidesRoutes.get(GomokuComponent));

@NgModule({
  imports: [
    routes,
    PresentationModule,
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
export class GomokuModule {}
