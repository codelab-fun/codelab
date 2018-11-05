import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SlidesDeckComponent } from '@angular-presentation/slides/src/lib/deck/deck.component';
import { SlideDirective } from '@angular-presentation/slides/src/lib/slide/slide.directive';
import { ShortcutsDirective } from '@angular-presentation/slides/src/lib/shortcuts/shortcuts.directive';

export const slidesRoutes: Route[] = [];

@NgModule({
  declarations: [
    SlidesDeckComponent,
    SlideDirective,
    ShortcutsDirective,
  ],
  exports: [
    SlidesDeckComponent,
    SlideDirective,
    ShortcutsDirective
  ],
  imports: [CommonModule, RouterModule]
})
export class SlidesModule {
}
