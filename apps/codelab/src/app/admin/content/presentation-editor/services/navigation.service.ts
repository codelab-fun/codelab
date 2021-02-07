import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly selectedSlideSubject = new BehaviorSubject(0);
  private readonly selectedPresentationIdSubject = new BehaviorSubject<
    string | undefined
  >(undefined);
  public selectedSlide$ = this.selectedSlideSubject.asObservable();
  public selectedPresentationId$ = this.selectedPresentationIdSubject.asObservable();

  constructor(
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly location: Location
  ) {
    // TODO(kirjs): need a better way
    const params =
      router.routerState.snapshot.root.firstChild.firstChild.firstChild.params;
    this.selectedPresentationIdSubject.next(params.presentation);
    this.selectedSlideSubject.next(params.slide);
  }

  goToPresentation(presentationId: string) {
    this.selectedPresentationIdSubject.next(presentationId);
    this.router.navigate(['admin', 'content', presentationId, '0']);
  }

  goToSlide(presentationId: string, index: number) {
    if (index >= 0) {
      this.selectedSlideSubject.next(index);
      this.location.replaceState(
        'admin/content/' + presentationId + '/' + index
      );
    }
  }

  nextSlide(presentationId: string) {
    this.goToSlide(presentationId, this.selectedSlideSubject.value + 1);
  }

  previousSlide(presentationId: string) {
    this.goToSlide(presentationId, this.selectedSlideSubject.value - 1);
  }
}
