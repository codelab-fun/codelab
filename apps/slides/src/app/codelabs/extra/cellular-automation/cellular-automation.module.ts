import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/slides/src/slide-routes';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/feedback.module';
import { SlidesModule } from '../../../../../../../libs/slides/src/slides.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { CellularAutomationComponent } from './cellular-automation.component';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { Rule3Component } from './rule3/rule3.component';
import { RuleComponent } from './rule/rule.component';
import { Rule8Component } from './rule8/rule8.component';
import { OscilatorsComponent } from './oscilators/oscilators.component';

const routes = RouterModule.forChild(
  SlidesRoutes.get(CellularAutomationComponent)
);

@NgModule({
  imports: [routes, SlidesModule, FeedbackModule, ExerciseModule, CommonModule],
  declarations: [CellularAutomationComponent, BoardComponent, Rule3Component, RuleComponent, Rule8Component, OscilatorsComponent],
  exports: [CellularAutomationComponent]
})
export class CellularAutomationModule {

}
