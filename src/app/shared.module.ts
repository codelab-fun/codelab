import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SlideComponent} from './presentation/slide/slide.component';
import {PresentationComponent} from './presentation/presentation/presentation.component';
import {ResizeDirective} from './presentation/resize/resize.directive';
import {ShortcutsDirective} from './presentation/shortcuts/shortcuts.directive';
import {ProgressBarComponent} from './presentation/progress-bar/progress-bar.component';
import { FooterComponent } from './presentation/footer/footer.component';


@NgModule({
  declarations: [
    PresentationComponent,
    SlideComponent,
    FooterComponent,
    ResizeDirective,
    ShortcutsDirective,
    ProgressBarComponent,
    FooterComponent
  ],

  exports: [
    PresentationComponent,
    SlideComponent,
    FooterComponent,
    ProgressBarComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: []
})
export class SharedModule {

}
