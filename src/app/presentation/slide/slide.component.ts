import {Component, Input, OnInit} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  @Input() milestone;
  readonly id: number;
  private activeSubject = new BehaviorSubject<boolean>(false);
  public onActive: Observable<boolean>;

  constructor(
    public presentation: PresentationComponent,
    private route: ActivatedRoute) {
    this.onActive = this.activeSubject.distinctUntilChanged();
    this.id = presentation.registerSlide(this.milestone);
  }

  get active() {
    this.activeSubject.next(this.presentation.activeSlideId === this.id);
    return this.presentation.activeSlideId === this.id;
  }

  ngOnInit() { }

  disableShortcuts() {
    this.presentation.disableShortcuts();
  }

  disableResize() {
    this.presentation.disableResize();
  }
}
