import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { CommonModule } from '@angular/common';
import { ToolsComponent } from '../tools/tools.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BoardComponent, ToolsComponent],
  exports: [BoardComponent]
})
export class GomokuBoardModule {}
