import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VizComponent } from './viz.component';
import { GridComponent } from './grid/grid.component';



@NgModule({
  declarations: [VizComponent, GridComponent],
  exports: [
    VizComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VizModule { }
