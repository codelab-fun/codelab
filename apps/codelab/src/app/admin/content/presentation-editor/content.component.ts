import { Component } from '@angular/core';
import { ContentService } from './content.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ContentPresentation } from './types';

declare const require;

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
    })
  );

  selectedSlide$ = this.contentService.selectedSlide$;

  currentSlide$ = combineLatest(
    git[(this.presentation$, this.selectedSlide$)]
  ).pipe(
    map(([presentation, selectedSlide]) => {
      return presentation.slides[selectedSlide];
    })
  );

  constructor(
    readonly contentService: ContentService,
    readonly activeRoute: ActivatedRoute
  ) {}

  addSlide() {}

  reorder(move) {
    // this.contentService.setCode(
    //   moveSlide(
    //     this.contentService.code$.value,
    //     move.previousIndex,
    //     move.currentIndex
    //   )
    // );
  }
}
