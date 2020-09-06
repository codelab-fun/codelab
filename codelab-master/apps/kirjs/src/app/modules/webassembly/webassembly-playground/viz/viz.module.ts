import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VizComponent } from './viz.component';
import { GridComponent } from './grid/grid.component';
import { CellularAutomationModule } from '../../../cellular-automation/cellular-automation.module';

@NgModule({
  declarations: [VizComponent, GridComponent],
  exports: [VizComponent],
  imports: [CommonModule, CellularAutomationModule]
})
export class VizModule {}
