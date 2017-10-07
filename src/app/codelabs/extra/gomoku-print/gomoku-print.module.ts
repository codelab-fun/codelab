import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GomokuPrintComponent } from './gomoku-print.component';
import { GomokuBoardModule } from "../gomoku/board/board.module";


@NgModule({
  imports: [
    RouterModule.forChild([{path: `**`, component: GomokuPrintComponent}]),
    GomokuBoardModule
  ],
  declarations: [GomokuPrintComponent],
  exports: [GomokuPrintComponent]
})
export class GomokuPrintModule {

}
