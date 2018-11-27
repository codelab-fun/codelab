import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UseStateComponent } from './use-state.component';
import { UseStateDirective } from './use-state.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    UseStateComponent,
    UseStateDirective
  ],
  exports: [UseStateComponent]
})
export class UseStateModule {

}
