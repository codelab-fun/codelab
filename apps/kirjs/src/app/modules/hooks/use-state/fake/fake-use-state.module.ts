import { NgModule } from '@angular/core';

import { UseStateComponent } from './use-state.component';
import { UseStateDirective } from './use-state.directive';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    UseStateComponent,
    UseStateDirective
  ],
  exports: [UseStateComponent],
  bootstrap: [UseStateComponent],
})
export class UseStateModule {

}
