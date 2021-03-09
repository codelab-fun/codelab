import { Component, HostListener } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ContentService } from '../services/content.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentPresentation } from '../types';

@Component({
  selector: 'slides-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  readonly presentation$ = combineLatest([
    this.navigationService.selectedPresentationId$,
    this.contentService.state$
  ]).pipe(
    map(([presentationId, presentations]) => {
      return presentations.find(
        (p: ContentPresentation) => p.id === presentationId
      );
    })
  );

  readonly selectedSlide$ = combineLatest([
    this.presentation$,
    this.navigationService.selectedSlide$
  ]).pipe(
    map(([presentation, slideIdx]) => {
      return presentation.slides[slideIdx] || null;
    })
  );

  constructor(
    readonly navigationService: NavigationService,
    readonly contentService: ContentService
  ) {}

  @HostListener('window:keydown.arrowleft')
  previousSlide() {
    this.navigationService.previousPreviewSlide();
  }

  @HostListener('window:keydown.arrowright')
  nextSlide() {
    this.navigationService.nextPreviewSlide();
  }
}
