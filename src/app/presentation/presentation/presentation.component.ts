import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Mode} from '../mode.enum';
import {AnalyticsService} from '../analytics.service';

@Component({
  selector: 'slides-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  private generatedSlideIndex = 0;
  private activeMode: Mode = Mode.none;
  public config = {
    resize: false,
    hideControls: false
  };

  @Input() activeSlideIndex = 0;
  @Input() milestone?: string;
  @Input() public width = 1280;
  @Input() public height = 720;
  @Input() public zoom = 1;

  @Output() onSlideChange = new EventEmitter<number>();
  @Output() onSlideAdded = new EventEmitter<{ index: number, id: string }>();
  @Output() onModeChange = new EventEmitter<Mode>();

  // Expose enum to template
  modeEnum = Mode;

  constructor(private route: ActivatedRoute, analytics: AnalyticsService) {
    this.mode = this.route.snapshot.queryParams['mode'] || this.mode;
    this.milestone = this.route.snapshot.queryParams['milestone'];
    this.config.hideControls = this.route.snapshot.queryParams['hideControls'] || this.config.hideControls;
    this.config.resize = this.route.snapshot.queryParams['resize'] || this.config.resize;
  }

  get mode(): Mode {
    return this.activeMode;
  }

  set mode(value: Mode) {
    this.activeMode = value;
    this.onModeChange.next(value);
  }

  get totalSlides() {
    return this.generatedSlideIndex;
  }

  registerSlide(id: string, milestone: string) {
    if (this.milestone && milestone !== this.milestone) {
      return;
    }
    const index = this.generatedSlideIndex++;
    this.onSlideAdded.next({index, id});
    return index;
  }

  nextSlide() {
    if (this.canGoNext()) {
      this.activeSlideIndex++;
      this.onSlideChange.next(this.activeSlideIndex);
    }
  }

  previousSlide() {
    if (this.canGoPrevious()) {
      this.activeSlideIndex--;
      this.onSlideChange.next(this.activeSlideIndex);
    }
  }

  canGoNext(): boolean {
    return this.activeSlideIndex + 1 < this.generatedSlideIndex;
  }

  canGoPrevious(): boolean {
    return this.activeSlideIndex > 0;
  }

  disableResize() {
    // TODO
  }

}
