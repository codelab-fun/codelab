import { Component } from '@angular/core';
import { ContentService } from './services/content.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'slides-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent {
  readonly presentation$ = this.contentService.presentation$;

  currentSlideIndex$ = this.navigationService.currentSlideIndex$;

  currentSlide$ = combineLatest([
    this.navigationService.currentSlideIndex$,
    this.presentation$
  ]).pipe(
    map(([slideIndex, presentation]) => {
      return presentation.slides[slideIndex || 0];
    })
  );

  constructor(
    private readonly contentService: ContentService,
    private readonly navigationService: NavigationService,
    private readonly activeRoute: ActivatedRoute
  ) {

  }

  addSlide(presentationId: string) {
    this.contentService.addSlide(presentationId);
  }

  updatePresentationMeta(presentationId: string, name: string, value: string) {
    this.contentService.updatePresentationMeta(presentationId, name, value);
  }
}
