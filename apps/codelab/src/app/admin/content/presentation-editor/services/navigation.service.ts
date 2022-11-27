import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

export const NAVIGATION_BASE_URL = new InjectionToken<string>('BaseUrl');

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly selectedSlideSubject = new BehaviorSubject(0);
  private readonly selectedPresentationIdSubject = new BehaviorSubject<
    string | undefined
  >(undefined);
  public selectedSlide$ = this.selectedSlideSubject.asObservable();
  public selectedPresentationId$ =
    this.selectedPresentationIdSubject.asObservable();

  constructor(
    @Inject(NAVIGATION_BASE_URL) readonly baseUrl,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly location: Location
  ) {
    // TODO(kirjs): Because we're in a service we don't have access to the proper level
    //  ActivatedRoute, so we have use magic.
    let firstChild = router.routerState.snapshot.root.firstChild;

    while (firstChild.firstChild) {
      firstChild = firstChild.firstChild;
    }

    const params = firstChild.params;
    this.selectedPresentationIdSubject.next(params.presentation);
    this.selectedSlideSubject.next(params.slide);
  }

  goToPresentation(presentationId: string) {
    this.selectedPresentationIdSubject.next(presentationId);
    this.router.navigate([...this.baseUrl.split('/'), presentationId, '0']);
  }

  goToSlide(presentationId: string, index: number) {
    if (index >= 0) {
      this.selectedSlideSubject.next(index);
      this.location.replaceState(
        this.baseUrl + '/' + presentationId + '/' + index
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
