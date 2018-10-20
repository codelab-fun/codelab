import { Directive, HostListener, Optional } from '@angular/core';
import { PresentationComponent, SlideControls } from '../presentation/presentation.component';
import { PresentationComponentV2 } from '../v2/pres/presentation-componentv2.component';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[slides-shortcuts]'
})
export class ShortcutsDirective {
  private presentation: SlideControls;

  constructor(
    @Optional() presentation: PresentationComponent,
    @Optional() presentationv2: PresentationComponentV2,
  ) {
    this.presentation = presentation || presentationv2;
  }

  @HostListener('window:keydown.ArrowRight', ['$event.target'])
  @HostListener('window:keydown.PageDown', ['$event.target'])
  next(target) {
    if (target === document.body) {
      this.presentation.nextSlide();
    }
  }

  @HostListener('window:keydown.ArrowLeft', ['$event.target'])
  @HostListener('window:keydown.PageUp', ['$event.target'])
  previous(target) {
    if (target === document.body) {
      this.presentation.previousSlide();
    }
  }

}
