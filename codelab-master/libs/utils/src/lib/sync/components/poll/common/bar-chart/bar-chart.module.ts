import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart.component';

@NgModule({
  declarations: [BarChartComponent],
  exports: [BarChartComponent],
  imports: [CommonModule]
})
export class BarChartModule {}
