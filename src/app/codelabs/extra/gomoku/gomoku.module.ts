import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { GomokuComponent } from './gomoku.component';
import { TooltipsModule } from '../../../tooltips/tooltips.module';
import { FakeBabelModule } from '../../../exercise/fake-babel-runner/fake-babel-runner.model';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { ToolsComponent } from './tools/tools.component';


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
    RunnersModule,
    CommonModule,
    TooltipsModule,
    FakeBabelModule
  ],
  declarations: [GomokuComponent, BoardComponent, ToolsComponent],
  exports: [GomokuComponent]
})
export class GomokuModule {

}
