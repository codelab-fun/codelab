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
import { FeedbackSlideComponent } from './feedback-slide/feedback-slide.component';
import { AnalyticsService } from './analytics.service';
import { SlideIfDirective } from './slide-if/slide-if.directive';
import { HammerGestureConfig } from '@angular/platform-browser';


export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    stop_browser_behavior: false,
    cssProps: {
      userSelect: 'auto',
    },
  }
}


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
    ShortcutsDirective,
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

  ],
  providers: [
    AnalyticsService
  ],
  bootstrap: []
})
export class PresentationModule {

}
