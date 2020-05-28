import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { FeedbackModule } from '@codelab/feedback';
import { BrowserWindowModule } from '@codelab/browser';
import { GomokuComponent } from './gomoku.component';
import { GomokuBoardModule } from './board/board.module';

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
