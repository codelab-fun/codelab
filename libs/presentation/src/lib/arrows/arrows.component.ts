import { Component, OnInit, Optional } from '@angular/core';
import { PresentationComponent, SlideControls } from '../presentation/presentation.component';
import { PresentationComponentV2 } from '../v2/pres/presentation-componentv2.component';


@Component({
  selector: 'slides-arrows',
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.css']
})
export class ArrowsComponent implements OnInit {
  private presentation: SlideControls;

  constructor(
    @Optional() presentation: PresentationComponent,
    @Optional() presentationv2: PresentationComponentV2,
  ) {
    this.presentation = presentation || presentationv2;
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


  ngOnInit() {
  }

}
