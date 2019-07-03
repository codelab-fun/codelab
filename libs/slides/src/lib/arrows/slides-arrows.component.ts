import { Component, HostBinding } from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';

@Component({
  selector: 'slide-arrows',
  templateUrl: './slides-arrows.component.html',
  styleUrls: ['./slides-arrows.component.css']
})
export class SlidesArrowsComponent {

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
