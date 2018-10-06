import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnalyticsService } from '../analytics.service';
import { BehaviorSubject } from 'rxjs';

declare const ga;

@Component({
  selector: 'slides-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  // TODO(kirjs): changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationComponent implements AfterViewInit {
  public config = {
    hideControls: false
  };
  public index: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  @Input() activeSlideIndex = 0;
  @Input() milestone?: string;
  @Input() public zoom = 1;
  @Output() onSlideChange = new EventEmitter<number>();
  @Output() onSlideAdded = new EventEmitter<{ index: number, id: string }>();
  slides = [];
  private generatedSlideIndex = 0;

  constructor(private route: ActivatedRoute, private analytics: AnalyticsService) {
    debugger;
    this.milestone = this.route.snapshot.queryParams['milestone'];
    this.config.hideControls = this.route.snapshot.queryParams['hideControls'] || this.config.hideControls;
  }

  get totalSlides() {
    return this.generatedSlideIndex;
  }

  ngAfterViewInit(): void {
    this.trackProgress();
    this.goToSlide(this.activeSlideIndex);
  }


  registerSlide(id: string, milestone: string) {
    if (this.milestone && milestone !== this.milestone) {
      return;
    }
    const index = this.generatedSlideIndex++;
    if (this.route.snapshot.params.id === id) {
      this.activeSlideIndex = index;
    }
    this.slides.push({id, index});
    this.onSlideAdded.next({index, id});
    return index;
  }

  // TODO: Move out to a separate module;
  trackProgress() {
    const path = this.route.parent.snapshot.routeConfig && this.route.parent.snapshot.routeConfig.path || 'index';

    if (this.activeSlideIndex === 0) {
      const key = `been-here-mileston-start-${path}`;
      const time = +Date.now();
      localStorage.setItem(key, time.toString());
      this.analytics.sendEvent('milestone', 'start', path);

    }

    if (this.generatedSlideIndex > 0 && this.activeSlideIndex === this.generatedSlideIndex - 1) {
      const key = `been-here-mileston-end-${path}`;
      const startTime = parseInt(localStorage.getItem(`been-here-mileston-start-${path}`), 10) || (+Date.now());
      const time = (+Date.now()) - startTime;
      localStorage.setItem(key, 'yes');
      this.analytics.sendEvent('milestone', 'end', path);
      this.analytics.sendTiming('milestone', 'complete', time, path);
    }
  }

  nextSlide() {
    if (this.canGoNext()) {
      this.goToSlide(this.activeSlideIndex + 1);
    }
  }

  previousSlide() {
    if (this.canGoPrevious()) {
      this.goToSlide(this.activeSlideIndex - 1);
    }
  }

  canGoNext(): boolean {
    return this.activeSlideIndex + 1 < this.generatedSlideIndex;
  }

  canGoPrevious(): boolean {
    return this.activeSlideIndex > 0;
  }

  goToSlide(index) {
    this.activeSlideIndex = index;
    this.onSlideChange.next(index);
    this.index.next(index);
    this.trackProgress();
  }
}
