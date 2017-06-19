import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, OnInit } from '@angular/core';
import { Mode } from '../mode.enum';
import { Observable } from 'rxjs/Observable';
import { PresentationComponent } from '../presentation/presentation.component';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'slides-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  private slideId: number;
  private activeSubject = new BehaviorSubject<boolean>(false);

  public onActive: Observable<boolean>;

  @Input() milestone?: string;
  @Input() id: string;
  modeEnum = Mode;
  isExercise = false;

  constructor(public presentation: PresentationComponent) {
    this.onActive = this.activeSubject.distinctUntilChanged();
  }

  get active(): boolean {
    // this.activeSubject.next(this.presentation.activeSlideIndex === this.slideId);
    // return this.presentation.activeSlideIndex === this.slideId || this.presentation.mode === Mode.overview;
    return false;
  }

  ngOnInit() {
    // this.slideId = this.presentation.registerSlide(this.id, this.milestone);
  }

  disableResize() {
    this.presentation.disableResize();
  }
}
