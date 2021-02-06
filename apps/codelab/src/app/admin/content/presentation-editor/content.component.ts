import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ContentService } from './content.service';
import { ContentPresentation } from './types';

@Component({
  selector: 'slides-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  readonly presentation$ = combineLatest([
    this.activeRoute.params,
    this.contentService.state$
  ]).pipe(
    map(([params, presentations]) => {
      return presentations.find(
        (p: ContentPresentation) => p.id === params.presentation
      );
    }),
    shareReplay(1)
  );

  currentSlideIndex$ = this.contentService.currentSlideIndex$;

  currentSlide$ = combineLatest([
    this.activeRoute.params,
    this.presentation$
  ]).pipe(
    map(([params, presentation]) => {
      return presentation.slides[params.slide || 0];
    })
  );

  constructor(
    readonly contentService: ContentService,
    readonly activeRoute: ActivatedRoute
  ) {}

  addSlide(presentationId: string) {
    this.contentService.addSlide(presentationId);
  }
}
