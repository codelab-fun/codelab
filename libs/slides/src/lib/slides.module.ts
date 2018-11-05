import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SlidesDeckComponent } from '@angular-presentation/slides/src/lib/deck/deck.component';
import { SlideDirective } from '@angular-presentation/slides/src/lib/slide/slide.directive';
import { ShortcutsDirective } from '@angular-presentation/slides/src/lib/shortcuts/shortcuts.directive';
import { SlidesArrowsComponent } from '@angular-presentation/slides/src/lib/arrows/slides-arrows.component';

export const slidesRoutes: Route[] = [];

@NgModule({
  declarations: [
    SlidesDeckComponent,
    SlideDirective,
    ShortcutsDirective,
    SlidesArrowsComponent,
  ],
  exports: [
    SlidesDeckComponent,
    SlideDirective,
    ShortcutsDirective,
    SlidesArrowsComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class SlidesModule {
}
