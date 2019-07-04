import { Component, HostBinding } from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';

/**
 * Slide arrows are used by slides deck for navigation.
 */
@Component({
  selector: 'slide-arrows',
  templateUrl: './slides-arrows.component.html',
  styleUrls: ['./slides-arrows.component.css']
})
export class SlidesArrowsComponent {
  /**
   * '.shortcuts-context' class is used by shortcuts
   * directive to distinguish slide navigation keyboard events
   * from editable field keyboard navigation.
   */
  @HostBinding('class.shortcuts-context') context = true;

  constructor(private presentation: SlidesDeckComponent) {}

  goToPreviousSlide() {
    this.presentation.previousSlide();
  }

  goToNextSlide() {
    this.presentation.nextSlide();
  }

  canGoNext(): boolean {
    return this.presentation.canGoNext();
  }

  canGoPrevious(): boolean {
    return this.presentation.canGoPrevious();
  }
}
