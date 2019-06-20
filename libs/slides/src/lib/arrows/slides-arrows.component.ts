import { Component, ElementRef } from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';

@Component({
  selector: 'slide-arrows',
  templateUrl: './slides-arrows.component.html',
  styleUrls: ['./slides-arrows.component.css']
})
export class SlidesArrowsComponent {

  constructor(
    public elementRef: ElementRef,
    private presentation: SlidesDeckComponent
  ) {}

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
