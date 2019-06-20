import { Directive, HostListener, Optional, ContentChild } from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';
import { SlidesArrowsComponent } from '../arrows/slides-arrows.component';
import { FullScreenModeService } from '@codelab/utils';

@Directive({
  selector: '[slideShortcuts]'
})
export class ShortcutsDirective {

  @ContentChild(SlidesArrowsComponent, { static: false }) private arrows: SlidesArrowsComponent;

  constructor(@Optional() private deck: SlidesDeckComponent, private fullScreenService: FullScreenModeService) {}

  @HostListener('window:keydown.ArrowRight', ['$event.target'])
  @HostListener('window:keydown.PageDown', ['$event.target'])
  next(target) {
    if (this.canNavigate(target) && this.deck.canGoNext()) {
      this.deck.nextSlide();
    }
  }

  @HostListener('window:keydown.ArrowLeft', ['$event.target'])
  @HostListener('window:keydown.PageUp', ['$event.target'])
  previous(target) {
    if (this.canNavigate(target) && this.deck.canGoPrevious()) {
      this.deck.previousSlide();
    }
  }

  @HostListener('window:keydown.alt.enter', ['$event'])
  fullScreenModeToggle(e) {
    // prevent page reload
    e.preventDefault();

    this.fullScreenService.toggleFullScreen();
  }

  private canNavigate(target: HTMLElement) {
    return target === document.body || (this.arrows && this.arrows.elementRef.nativeElement.contains(target));
  }
}
