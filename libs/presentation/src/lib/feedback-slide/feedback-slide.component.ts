import { Component, OnInit } from '@angular/core';
import { PresentationComponent } from '../presentation/presentation.component';
import { SlideComponent } from '../slide/slide.component';

@Component({
  selector: 'slides-feedback-slide',
  templateUrl: './feedback-slide.component.html',
  styleUrls: ['./feedback-slide.component.css']
})

export class FeedbackSlideComponent implements OnInit {

  constructor(private presentation: PresentationComponent, private slide: SlideComponent) {
  }

  ngOnInit() {
  }

  closeSlide() {
    this.presentation.nextSlide();
  }

}
