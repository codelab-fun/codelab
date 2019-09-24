import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  Directive,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[slidesRouting]'
})
export class SlidesRoutingDirective implements OnInit, OnDestroy {
  activeSlideId: string;
  @Output() change = new EventEmitter();

  private ids: { [index: number]: string } = {};

  private ngUnsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deck: SlidesDeckComponent
  ) {
    this.handleBackButtonSlideIndexSync();
  }

  @HostListener('slideChange', ['$event']) slideChange(index) {
    this.navigate(this.getId(index));
  }

  ngOnInit() {
    const index2 = this.getIndexFromRouteParam();
    this.deck.goToSlide(isNaN(index2) ? 0 : index2);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getId(index: number) {
    return this.deck.slides &&
      this.deck.slides[index] &&
      this.deck.slides[index].id
      ? this.deck.slides[index].id
      : index;
  }

  navigate(url: string) {
    this.router.navigate(['../' + url], {
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
  }

  getIndexFromRouteParam() {
    const id: string = this.route.snapshot.params['id'];
    const index = this.deck.slides.findIndex(s => s.id === id);
    // TODO(kirjs): Clean this up
    return Number(index === -1 ? id : index);
  }

  /**
   * This is to ensure that the activeSlideIndex of the deck
   * is always reflective of the router's path for the slide.
   *
   * The {@link SlidesDeckComponent} component changes slides only
   * when the methods to change slide are called. However, this is
   * only true when {@link SlidesArrowsComponent} invokes it. We
   * therefore have an issue when the user uses the browser's back
   * button behavior, which the deck and the arrow does not handle.
   */
  private handleBackButtonSlideIndexSync() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getIndexFromRouteParam()),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(slide => {
        this.deck.goToSlide(slide);
      });
  }
}
