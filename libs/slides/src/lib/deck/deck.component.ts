import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'slide-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class SlidesDeckComponent {
  slides: any[] = [];
  @Input() theme = 'basic';
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;
  activeSlideIndex = 0;
  @Output() slideChange = new EventEmitter<number>();
  @Output() slideAdded = new EventEmitter<{ index: number; id: string }>();
  @HostBinding('class.has-milestone') hasMilestone = false;
  private milestone = '';

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Optional() private readonly route: ActivatedRoute
  ) {
    if (route) {
      this.milestone = route.snapshot.queryParams.milestone;
      this.hasMilestone = !!this.milestone;
    }
  }

  addSlide(slide) {
    if (!this.milestone || this.milestone === slide.milestone) {
      this.slides.push(slide);
    }
  }

  goToSlide(index: number) {
    this.activeSlideIndex = index;
    this.slideChange.emit(index);
    this.cdr.markForCheck();
  }

  nextSlide() {
    this.goToSlide(this.activeSlideIndex + 1);
  }

  previousSlide() {
    this.goToSlide(this.activeSlideIndex - 1);
  }

  canGoNext(): boolean {
    return this.activeSlideIndex + 1 < this.slides.length;
  }

  canGoPrevious(): boolean {
    return this.activeSlideIndex > 0;
  }
}
