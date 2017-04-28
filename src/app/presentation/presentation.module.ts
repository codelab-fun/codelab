import { ArrowsComponent } from './arrows/arrows.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuShortcutComponent } from './menu-shortcut/menu-shortcut.component';
import { ModeOverviewComponent } from './mode-overview/mode-overview.component';
import { ModeRoutingDirective } from './mode-routing/mode-routing.directive';
import { NgModule } from '@angular/core';
import { PresentationComponent } from './presentation/presentation.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ResizeDirective } from './resize/resize.directive';
import { ShortcutsDirective } from './shortcuts/shortcuts.directive';
import { SlideComponent } from './slide/slide.component';
import { SlidesRoutingDirective } from './slides-routing/slides-routing.directive';


@NgModule({
  declarations: [
    PresentationComponent,
    SlideComponent,
    FooterComponent,
    ResizeDirective,
    ShortcutsDirective,
    ProgressBarComponent,
    SlidesRoutingDirective,
    ArrowsComponent,
    ModeOverviewComponent,
    MenuShortcutComponent,
    ModeRoutingDirective
  ],

  exports: [
    PresentationComponent,
    SlideComponent,
    FooterComponent,
    ProgressBarComponent,
    ArrowsComponent,
    SlidesRoutingDirective,
    ModeOverviewComponent,
    MenuShortcutComponent,
    ModeRoutingDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class PresentationModule {

}
