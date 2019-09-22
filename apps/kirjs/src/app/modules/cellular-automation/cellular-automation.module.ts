import { NgModule } from '@angular/core';
import { FeedbackModule } from '@codelab/feedback';

import { CellularAutomationComponent } from './cellular-automation.component';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { Rule3Component } from './rule3/rule3.component';
import { RuleComponent } from './rule/rule.component';
import { Rule8Component } from './rule8/rule8.component';
import { OscilatorsComponent } from './oscilators/oscilators.component';
import { SlidesModule } from '@codelab/slides';
import { Rule4Component } from './rule3/rule4/rule4.component';

@NgModule({
  imports: [SlidesModule, FeedbackModule, CommonModule],
  declarations: [
    CellularAutomationComponent,
    BoardComponent,
    Rule3Component,
    RuleComponent,
    Rule8Component,
    OscilatorsComponent,
    Rule4Component
  ],
  exports: [
    CellularAutomationComponent,
    CellularAutomationComponent,
    BoardComponent,
    Rule3Component,
    RuleComponent,
    Rule8Component,
    OscilatorsComponent,
    BoardComponent,
    Rule4Component
  ]
})
export class CellularAutomationModule {}
