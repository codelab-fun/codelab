import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from './presentation/presentation.component';
import { SlideComponent } from './slide/slide.component';
import { FooterComponent } from './footer/footer.component';
import { ShortcutsDirective } from './shortcuts/shortcuts.directive';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SlidesRoutingDirective } from './slides-routing/slides-routing.directive';
import { ArrowsComponent } from './arrows/arrows.component';
import { MenuShortcutComponent } from './menu-shortcut/menu-shortcut.component';
import { TitleSlideComponent } from './title-slide/title-slide.component';
import { RippleAnimationComponent } from './ripple-animation/ripple-animation.component';
import { ClosingSlideComponent } from './closing-slide/closing-slide.component';
import { RouterModule } from '@angular/router';
import { FeedbackSlideComponent } from './feedback-slide/feedback-slide.component';
import { AnalyticsService } from './analytics.service';
import { SlideIfDirective } from './slide-if/slide-if.directive';




@NgModule({
  declarations: [
    PresentationComponent,
    SlideComponent,
    FooterComponent,
    ShortcutsDirective,
    ProgressBarComponent,
    SlidesRoutingDirective,
    ArrowsComponent,
    MenuShortcutComponent,
    TitleSlideComponent,
    RippleAnimationComponent,
    FeedbackSlideComponent,
    ClosingSlideComponent,
    SlideIfDirective
  ],

  exports: [
    PresentationComponent,
    SlideComponent,
    FooterComponent,
    ProgressBarComponent,
    ArrowsComponent,
    SlidesRoutingDirective,
    TitleSlideComponent,
    MenuShortcutComponent,
    FeedbackSlideComponent,
    ClosingSlideComponent,
    SlideIfDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [AnalyticsService],
  bootstrap: []
})
export class PresentationModule {

}
