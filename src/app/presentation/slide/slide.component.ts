import { Component, Input, OnInit } from '@angular/core';
import { PresentationComponent } from '../presentation/presentation.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import {PresentationMode} from '../presentation-mode.enum';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  private slideId: number;
  private activeSubject = new BehaviorSubject<boolean>(false);
  public onActive: Observable<boolean>;

  @Input()
  id: string;

  constructor(public presentation: PresentationComponent) {
    this.onActive = this.activeSubject.distinctUntilChanged();
  }

  get active() {
    this.activeSubject.next(this.presentation.activeSlideIndex === this.slideId);
    return this.presentation.activeSlideIndex === this.slideId || this.presentation.mode === PresentationMode.overview;
  }

  ngOnInit() {
    this.slideId = this.presentation.registerSlide(this.id);
  }

  disableShortcuts() {
    this.presentation.disableShortcuts();
  }

  disableResize() {
    this.presentation.disableResize();
  }
}
