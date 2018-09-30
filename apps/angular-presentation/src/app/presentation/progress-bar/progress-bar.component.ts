import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PresentationComponent } from '../presentation/presentation.component';

@Component({
  selector: 'slides-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements AfterViewInit {
  slides = [];
  currentSlideId = 0;

  constructor(public presentation: PresentationComponent) {
  }

  ngAfterViewInit() {
    // Change detection complains if updating it right away.
    requestAnimationFrame(() => {
      this.slides = this.presentation.slides;
    });

    this.presentation.onSlideChange.subscribe(() => {
      this.currentSlideId = this.presentation.activeSlideIndex;
    });
  }

  goToSlide(index) {
    this.presentation.goToSlide(index);
  }
}
