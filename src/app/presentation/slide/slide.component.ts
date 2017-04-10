import {Component, OnInit} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  readonly id: number;

  constructor(public presentation: PresentationComponent) {
    this.id = presentation.generateSlideId();
  }

  get active() {
    return this.presentation.activeSlideId === this.id;
  }

  ngOnInit() {
  }

}
