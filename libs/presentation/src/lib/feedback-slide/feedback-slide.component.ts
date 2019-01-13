import { Component } from '@angular/core';
import { PresentationComponent } from '../presentation/presentation.component';

@Component({
  selector: 'slides-feedback-slide',
  templateUrl: './feedback-slide.component.html',
  styleUrls: ['./feedback-slide.component.css']
})

export class FeedbackSlideComponent {

  constructor(private presentation: PresentationComponent) {
  }

  closeSlide() {
    this.presentation.nextSlide();
  }

}
