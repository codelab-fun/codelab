import {NgModule} from '@angular/core';
import {SlideComponent} from './presentation/slide/slide.component';
import {PresentationComponent} from './presentation/presentation/presentation.component';
import {ResizeDirective} from './presentation/resize/resize.directive';
import {ShortcutsDirective} from './presentation/shortcuts/shortcuts.directive';
import {ProgressBarComponent} from './presentation/progress-bar/progress-bar.component';
import {ArrowsComponent} from './presentation/arrows/arrows.component';
import {SlidesRoutingDirective} from './presentation/slides-routing/slides-routing.directive';
import {FooterComponent} from './presentation/footer/footer.component';
import {BrowserWindowComponent} from './presentation/browser-window/browser-window.component';
import {CommonModule} from '@angular/common';


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
    BrowserWindowComponent
  ],

  exports: [
    PresentationComponent,
    SlideComponent,
    FooterComponent,
    ProgressBarComponent,
    ArrowsComponent,
    SlidesRoutingDirective,
    BrowserWindowComponent
  ],
  imports: [CommonModule],
  providers: [],
  bootstrap: []
})
export class PresentationModule {

}
