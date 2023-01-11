import { Directive, HostListener } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides';

@Directive({
  selector: '[nextSlide]',
})
export class NextSlideDirective {
  constructor(public deck: SlidesDeckComponent) {}

  @HostListener('click')
  onClick() {
    this.deck.nextSlide();
  }
}
