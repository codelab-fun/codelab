import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Mode} from '../mode.enum';

@Component({
  selector: 'slides-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  private generatedSlideIndex = 0;
  private activeMode: Mode = Mode.none;

  @Input() activeSlideIndex = 0;
  @Input() milestone?: string;
  @Input() public width = 1280;
  @Input() public height = 720;
  @Input() public zoom = 1;

  @Output() onSlideChange = new EventEmitter<number>();
  @Output() onSlideAdded = new EventEmitter<{ index: number, id: string }>();
  @Output() onModeChange = new EventEmitter<Mode>();
  areShortcutsEnabled = true;
  disableArrowsForCode = true;
  // Expose enum to template
  modeEnum = Mode;

  constructor(private route: ActivatedRoute) {
    if (!!this.route.snapshot.queryParams['mode']) {
      this.mode = this.route.snapshot.queryParams['mode'];
    }
    this.milestone = this.route.snapshot.queryParams['milestone'];
    this.areShortcutsEnabled = !(this.route.snapshot.queryParams['shortcuts'] === 'false');
    this.disableArrowsForCode = !(this.route.snapshot.queryParams['disableArrowsForCode'] === 'false');
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

  nextSlide(isTriggeredByShortcut: boolean = false) {
    if (this.canGoNext() && (this.areShortcutsEnabled || !isTriggeredByShortcut)) {
      this.activeSlideIndex++;
      this.onSlideChange.next(this.activeSlideIndex);
    }
  }

  previousSlide(isTriggeredByShortcut: boolean = false) {
    if (this.canGoPrevious() && (this.areShortcutsEnabled || !isTriggeredByShortcut)) {
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
