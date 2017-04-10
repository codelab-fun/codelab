import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SlideComponent} from './presentation/slide/slide.component';
import {PresentationComponent} from './presentation/presentation/presentation.component';
import {ResizeDirective} from './presentation/resize/resize.directive';
import {ShortcutsDirective} from './presentation/shortcuts/shortcuts.directive';



@NgModule({
  declarations: [
    PresentationComponent,
    SlideComponent,
    ResizeDirective,
    ShortcutsDirective
  ],

  exports: [
    PresentationComponent,
    SlideComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: []
})
export class SharedModule {

}
