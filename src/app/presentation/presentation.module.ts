import { ArrowsComponent } from './arrows/arrows.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
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
    OverviewComponent,
  ],

  exports: [
    PresentationComponent,
    SlideComponent,
    FooterComponent,
    ProgressBarComponent,
    ArrowsComponent,
    SlidesRoutingDirective,
    OverviewComponent
  ],
  imports: [CommonModule],
  providers: [],
  bootstrap: []
})
export class PresentationModule {

}
