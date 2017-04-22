import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipsDirective} from './tooltips.directive';
import {FocusHighlightDirective} from './focus-highlight.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TooltipsDirective, FocusHighlightDirective],
  exports: [TooltipsDirective, FocusHighlightDirective]
})
export class TooltipsModule {
}
