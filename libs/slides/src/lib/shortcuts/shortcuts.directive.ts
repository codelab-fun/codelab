import { Directive, HostListener, Optional } from '@angular/core';
import { SlidesDeckComponent } from '@angular-presentation/slides/src/lib/deck/deck.component';

@Directive({
  selector: '[slidesShortcuts]'
})
export class ShortcutsDirective {
  constructor(
    @Optional() private deck: SlidesDeckComponent,
  ) {
  }

  @HostListener('window:keydown.ArrowRight', ['$event.target'])
  @HostListener('window:keydown.PageDown', ['$event.target'])
  next(target) {
    if (target === document.body && this.deck.canGoNext()) {
      this.deck.nextSlide();
    }
  }

  @HostListener('window:keydown.ArrowLeft', ['$event.target'])
  @HostListener('window:keydown.PageUp', ['$event.target'])
  previous(target) {
    if (target === document.body && this.deck.canGoPrevious()) {
      this.deck.previousSlide();
    }
  }

}
