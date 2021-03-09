import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {
  private readonly selectedSlideSubject = new BehaviorSubject(0);
  private readonly selectedPresentationIdSubject = new BehaviorSubject<
    string | undefined
  >(undefined);
  public selectedSlide$ = this.selectedSlideSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public selectedPresentationId$ = this.selectedPresentationIdSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private readonly onDestroy: Subject<null> = new Subject<null>();

  constructor(
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly location: Location
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => this.getLeafRoute(this.router.routerState.root)),
        map(route => route.snapshot.params),
        takeUntil(this.onDestroy)
      )
      .subscribe(params => {
        this.selectedPresentationIdSubject.next(params.presentation);
        this.selectedSlideSubject.next(Number(params.slide));
      });
  }

  private getLeafRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  goToPresentation(presentationId: string) {
    this.router.navigate(['admin', 'content', presentationId, '0']);
  }

  goToSlide(presentationId: string, index: number, preview: boolean = false) {
    if (index >= 0) {
      this.router.navigate(
        [
          'admin',
          'content',
          presentationId,
          index,
          ...(preview ? ['preview'] : [])
        ],
        {
          replaceUrl: true
        }
      );
    }
  }

  nextSlide() {
    this.goToSlide(
      this.selectedPresentationIdSubject.value,
      this.selectedSlideSubject.value + 1
    );
  }

  previousSlide() {
    this.goToSlide(
      this.selectedPresentationIdSubject.value,
      this.selectedSlideSubject.value - 1
    );
  }

  nextPreviewSlide() {
    this.goToSlide(
      this.selectedPresentationIdSubject.value,
      this.selectedSlideSubject.value + 1,
      true
    );
  }

  previousPreviewSlide() {
    this.goToSlide(
      this.selectedPresentationIdSubject.value,
      this.selectedSlideSubject.value + 1,
      true
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
