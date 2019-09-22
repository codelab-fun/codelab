import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCellComponent } from './single-cell/single-cell.component';
import { SingleGridComponent } from './single-grid/single-grid.component';

@NgModule({
  declarations: [SingleCellComponent, SingleGridComponent],
  exports: [SingleCellComponent, SingleGridComponent],
  imports: [CommonModule]
})
export class CaModule {}
