import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { GomokuComponent } from './gomoku.component';
import { TooltipsModule } from '@mycurrentapp/tool-tips/src/tooltips.module';
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
