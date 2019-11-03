import { Directive, HostListener, Input } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';

export type SlideSwitchingDirection = 'next' | 'previous';

@Directive({
  selector: '[switchSlide]'
})
export class SwitchSlideDirective {
  constructor(public deck: SlidesDeckComponent) {}

  @Input() switchSlide: SlideSwitchingDirection = 'next';
  @HostListener('click')
  onClick() {
    if (this.switchSlide === 'next') {
      this.deck.nextSlide();
    } else {
      this.deck.previousSlide();
    }
  }
}
