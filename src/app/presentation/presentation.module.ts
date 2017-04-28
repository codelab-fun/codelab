import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PresentationComponent} from './presentation/presentation.component';
import {SlideComponent} from './slide/slide.component';
import {FooterComponent} from './footer/footer.component';
import {ResizeDirective} from './resize/resize.directive';
import {ShortcutsDirective} from './shortcuts/shortcuts.directive';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {SlidesRoutingDirective} from './slides-routing/slides-routing.directive';
import {ArrowsComponent} from './arrows/arrows.component';
import { MenuShortcutComponent } from './menu-shortcut/menu-shortcut.component';


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
    MenuShortcutComponent
  ],

  exports: [
    PresentationComponent,
    SlideComponent,
    FooterComponent,
    ProgressBarComponent,
    ArrowsComponent,
    SlidesRoutingDirective,
    MenuShortcutComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class PresentationModule {

}
