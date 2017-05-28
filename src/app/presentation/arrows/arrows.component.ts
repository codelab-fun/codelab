import { Component, OnInit } from '@angular/core';
import { PresentationComponent } from '../presentation/presentation.component';

@Component({
  selector: 'slides-arrows',
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.css']
})
export class ArrowsComponent implements OnInit {

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

  constructor(private presentation: PresentationComponent) {

  }

  ngOnInit() {
  }

}
