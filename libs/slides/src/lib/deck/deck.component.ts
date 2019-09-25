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

import { ActivatedRoute, Router } from '@angular/router';

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
  private previousLink: string;
  private nextLink: string;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
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
    if (this.activeSlideIndex + 1 < this.slides.length) {
      this.goToSlide(this.activeSlideIndex + 1);
    } else if (this.nextLink != null && this.nextLink !== '') {
      this.router.navigateByUrl(this.nextLink);
    }
  }

  previousSlide() {
    if (this.activeSlideIndex > 0) {
      this.goToSlide(this.activeSlideIndex - 1);
    } else if (this.previousLink != null && this.previousLink !== '') {
      this.router.navigateByUrl(this.previousLink);
    }
  }

  canGoNext(): boolean {
    return this.activeSlideIndex + 1 < this.slides.length || (this.nextLink != null && this.nextLink !== '');
  }

  canGoPrevious(): boolean {
    return this.activeSlideIndex > 0 || (this.previousLink != null && this.previousLink !== '');
  }

  public setupPreviousNext(allRoutes: string[]) {
    this.previousLink = '';
    this.nextLink = '';
    let currentUrl = this.router.url;
    if (currentUrl.startsWith('/')) {
      currentUrl = currentUrl.substr(1);
    }
    const urlPaths = currentUrl.split('/');
    if (urlPaths.length > 1) {
      const idx = allRoutes.indexOf(urlPaths[1]);
      if (idx > 0) {
        this.previousLink = `/${urlPaths[0]}/${allRoutes[idx - 1]}`;
      }
      if (idx < (allRoutes.length - 1)) {
        this.nextLink = `/${urlPaths[0]}/${allRoutes[idx + 1]}`;
      }
    }
  }
}
