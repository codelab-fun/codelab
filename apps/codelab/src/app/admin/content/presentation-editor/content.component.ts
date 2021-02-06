import { Component } from '@angular/core';
import { ContentService } from './services/content.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ContentPresentation } from './types';
import { NavigationService } from './services/navigation.service';

declare const require;

@Component({
  selector: 'slides-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  readonly presentation$ = combineLatest([
    this.navigationService.selectedPresentationId$,
    this.contentService.state$
  ]).pipe(
    map(([presentationId, presentations]) => {
      debugger;
      return presentations.find(
        (p: ContentPresentation) => p.id === presentationId
      );
    })
  );

  selectedSlide$ = this.contentService.selectedSlide$;

  currentSlide$ = combineLatest([
    this.navigationService.selectedSlide$,
    this.presentation$
  ]).pipe(
    map(([slide, presentation]) => {
      debugger;
      return presentation.slides[slide || 0];
    })
  );

  constructor(
    readonly contentService: ContentService,
    readonly navigationService: NavigationService,
    readonly activeRoute: ActivatedRoute
  ) {
    this.contentService.state$.subscribe(a => console.log());
  }

  addSlide(presentationId: string) {
    this.contentService.addSlide(presentationId);
  }
}
