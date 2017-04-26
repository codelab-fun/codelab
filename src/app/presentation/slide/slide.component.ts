import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PresentationComponent } from '../presentation/presentation.component';

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
    this.activeSubject.next(this.presentation.activeSlideId === this.slideId);
    return this.presentation.activeSlideId === this.slideId;
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
