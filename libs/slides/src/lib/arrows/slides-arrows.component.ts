import { Component } from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';

@Component({
  selector: 'slide-arrows',
  templateUrl: './slide-arrows.component.html',
  styleUrls: ['./slide-arrows.component.css']
})
export class SlidesArrowsComponent {
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
