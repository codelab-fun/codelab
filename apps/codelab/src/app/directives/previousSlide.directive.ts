import { Directive, HostListener } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';

@Directive({
  selector: '[previousSlide]'
})
export class PreviousSlideDirective {
  constructor(public deck: SlidesDeckComponent) {}

  @HostListener('click')
  onClick() {
    this.deck.previousSlide();
  }
}
