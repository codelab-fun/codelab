import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentService } from '../../services/content.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-presentation-editor',
  templateUrl: './presentation-editor.component.html',
  styleUrls: ['./presentation-editor.component.css'],
})
export class PresentationEditorComponent {
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
    private readonly navigationService: NavigationService
  ) {
  }

  addSlide(presentationId: string) {
    this.contentService.addSlide(presentationId);
  }

  updatePresentationMeta(presentationId: string, name: string, value: string) {
    this.contentService.updatePresentationMeta(presentationId, name, value);
  }
}
