import {Component} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';

@Component({
  selector: 'slides-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  slides = [];
  currentSlideId = 0;
  isHovered = false;

  constructor(public presentation: PresentationComponent) {
  }
  ngAfterViewInit() {
    this.slides = this.presentation.slides.toArray();
    this.presentation.onSlideChange.subscribe(() => {
      this.currentSlideId = this.presentation.activeSlideIndex;
    });
  }

  goToSlide(index){
    this.presentation.goToSlide(index);
  }
}
