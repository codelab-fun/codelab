import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SlidesDeckComponent } from './deck/deck.component';
import { SlideDirective } from './slide/slide.directive';
import { ShortcutsDirective } from './shortcuts/shortcuts.directive';
import { SlidesRoutingDirective } from './routing/slides-routing.directive';
import { SlidesArrowsComponent } from './arrows/slide-arrows.component';

@NgModule({
  declarations: [
    SlidesDeckComponent,
    SlideDirective,
    ShortcutsDirective,
    SlidesArrowsComponent,
    SlidesRoutingDirective
  ],
  exports: [
    SlidesDeckComponent,
    SlideDirective,
    ShortcutsDirective,
    SlidesArrowsComponent,
    SlidesRoutingDirective
  ],
  imports: [CommonModule, RouterModule]
})
export class SlidesModule {}
