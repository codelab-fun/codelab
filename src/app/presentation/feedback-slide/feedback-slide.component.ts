import { Component, HostListener, OnInit } from '@angular/core';
import { PresentationComponent } from '../presentation/presentation.component';

@Component({
  selector: 'app-feedback-slide',
  templateUrl: './feedback-slide.component.html',
  styleUrls: ['./feedback-slide.component.css']
})

export class FeedbackSlideComponent implements OnInit {

  constructor(private presentation: PresentationComponent) { }

  ngOnInit() {
  }

  closeSlide() {
    this.presentation.nextSlide();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.closeSlide();
  }

}
