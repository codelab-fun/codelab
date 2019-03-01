import { Directive, HostListener, Optional } from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';
import { FullScreenModeService } from '@codelab/utils';

@Directive({
  selector: '[slideShortcuts]'
})
export class ShortcutsDirective {
  constructor(@Optional() private deck: SlidesDeckComponent, private fullScreenService: FullScreenModeService) {}

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

  @HostListener('window:keydown.alt.enter', ['$event'])
  fullScreenModeToggle(e) {
    // prevent page reload
    e.preventDefault();

    this.fullScreenService.toggleFullScreen();
  }
}
