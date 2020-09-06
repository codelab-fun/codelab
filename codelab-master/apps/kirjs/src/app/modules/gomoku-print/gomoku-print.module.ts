import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GomokuPrintComponent } from './gomoku-print.component';
import { GomokuBoardModule } from '../gomoku/board/board.module';
import { XComponent } from './x/x.component';
import { OComponent } from './o/o.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: `**`, component: GomokuPrintComponent }]),
    GomokuBoardModule
  ],
  declarations: [GomokuPrintComponent, XComponent, OComponent],
  exports: [GomokuPrintComponent]
})
export class GomokuPrintModule {}
