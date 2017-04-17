import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipsDirective } from './tooltips.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TooltipsDirective],
  exports:[TooltipsDirective]
})
export class TooltipsModule { }
