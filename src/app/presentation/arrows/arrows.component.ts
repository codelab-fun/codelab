import {Component, OnInit} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';

@Component({
  selector: 'app-arrows',
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

  constructor(private presentation: PresentationComponent) {

  }

  ngOnInit() {
  }

}
