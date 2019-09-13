import { Component, HostBinding, Input } from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';
import { Router } from '@angular/router';

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
  @Input() previousLink: string;
  @Input() nextLink: string;

  constructor(
    private readonly router: Router,
    private presentation: SlidesDeckComponent
  ) {}

  goToPreviousSlide() {
    if (this.presentation.canGoPrevious()) {
      this.presentation.previousSlide();
    } else if (this.previousLink != null && this.previousLink !== '') {
      this.router.navigateByUrl(this.previousLink);
    }
  }

  goToNextSlide() {
    if (this.presentation.canGoNext()) {
      this.presentation.nextSlide();
    } else if (this.nextLink != null && this.nextLink !== '') {
      this.router.navigateByUrl(this.nextLink);
    }
  }

  canGoNext(): boolean {
    return this.presentation.canGoNext() || (this.nextLink != null && this.nextLink !== '');
  }

  canGoPrevious(): boolean {
    return this.presentation.canGoPrevious() || (this.previousLink != null && this.previousLink !== '');
  }
}
