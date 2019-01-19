import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../libs/presentation/src/lib/slide-routes';

import { ExerciseModule } from '../../../../../../libs/exercise/src/lib/exercise.module';

import { FeedbackModule } from '../../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserWindowModule } from '../../../../../../libs/browser/src/lib/browser.module';

import { GomokuComponent } from './gomoku.component';
import { TooltipsModule } from '../../../../../../libs/tooltips/src/lib/tooltips.module';
import { CommonModule } from '@angular/common';
import { GomokuBoardModule } from './board/board.module';
import { SlidesModule } from '@codelab/slides';

const routes = RouterModule.forChild(SlidesRoutes.get(GomokuComponent));

@NgModule({
  imports: [
    routes,

    ExerciseModule,
    BrowserWindowModule,
    FeedbackModule,
    CommonModule,
    TooltipsModule,
    GomokuBoardModule,
    SlidesModule
  ],
  declarations: [GomokuComponent],
  exports: [GomokuComponent]
})
export class GomokuModule {}
