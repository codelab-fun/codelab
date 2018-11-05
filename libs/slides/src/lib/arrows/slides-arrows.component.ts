import { Component } from '@angular/core';
import { SlidesDeckComponent } from '@angular-presentation/slides/src/lib/deck/deck.component';


@Component({
  selector: 'slides-arrow-navigation',
  templateUrl: './slides-arrows.component.html',
  styleUrls: ['./slides-arrows.component.css']
})
export class SlidesArrowsComponent {
  constructor(private presentation: SlidesDeckComponent) {
  }

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
