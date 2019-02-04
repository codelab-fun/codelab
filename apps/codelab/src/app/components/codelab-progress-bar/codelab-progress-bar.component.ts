import { AfterViewInit, Component } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';

@Component({
  selector: 'codelab-progress-bar',
  templateUrl: './codelab-progress-bar.component.html',
  styleUrls: ['./codelab-progress-bar.component.css']
})
export class CodelabProgressBarComponent implements AfterViewInit {
  slides = [];
  activeSlideIndex = 0;
  tempSlideId = 0;

  constructor(public deck: SlidesDeckComponent) {}

  ngAfterViewInit() {
    // Change detection complains if updating it right away.
    requestAnimationFrame(() => {
      this.slides = this.deck.slides;
      this.activeSlideIndex = this.deck.activeSlideIndex;
    });

    this.deck.slideChange.subscribe(index => {
      this.activeSlideIndex = index;
    });
  }

  previewSlide(index) {
    this.tempSlideId = this.activeSlideIndex;
    this.deck.goToSlide(index);
  }

  goToSlide(index) {
    this.deck.goToSlide(index);
    this.tempSlideId = this.activeSlideIndex;
  }
}
