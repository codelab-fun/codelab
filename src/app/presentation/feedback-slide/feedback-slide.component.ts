import {Component, HostListener, OnInit} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';
import {SlideComponent} from '../slide/slide.component';

@Component({
  selector: 'slides-feedback-slide',
  templateUrl: './feedback-slide.component.html',
  styleUrls: ['./feedback-slide.component.css']
})

export class FeedbackSlideComponent implements OnInit {

  // firstVisit: boolean = true;

  constructor(private presentation: PresentationComponent, private slide: SlideComponent) {
    //  this.firstVisit = true;
  }

  ngOnInit() {
  localStorage.setItem("visitedBefore", "yes");
  }

  closeSlide() {
    // this.presentation.nextSlide();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.slide.active) {
      // this.firstVisit = false;
      this.closeSlide();
    }
  }

}
