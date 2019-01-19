import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipsDirective } from './tooltips.directive';
import { FocusHighlightDirective } from './focus-highlight-match.directive';
import { BabelHighlightDirective } from './babel-highlight-match.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TooltipsDirective,
    FocusHighlightDirective,
    BabelHighlightDirective
  ],
  exports: [TooltipsDirective, FocusHighlightDirective, BabelHighlightDirective]
})
export class TooltipsModule {}
