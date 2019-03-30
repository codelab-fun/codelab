import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from 'ng-slides';
import { FeedbackModule } from '@codelab/feedback';
import { BrowserWindowModule } from '@codelab/browser';

import { GomokuComponent } from './gomoku.component';

import { CommonModule } from '@angular/common';
import { GomokuBoardModule } from './board/board.module';
import { SlidesModule } from 'ng-slides';

const routes = RouterModule.forChild(SlidesRoutes.get(GomokuComponent));

@NgModule({
  imports: [
    routes,

    BrowserWindowModule,
    FeedbackModule,
    CommonModule,
    GomokuBoardModule,
    SlidesModule
  ],
  declarations: [GomokuComponent],
  exports: [GomokuComponent]
})
export class GomokuModule {}
