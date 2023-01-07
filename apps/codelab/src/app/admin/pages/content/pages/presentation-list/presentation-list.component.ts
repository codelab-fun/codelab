import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'slides-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css'],
})
export class PresentationListComponent {

  presentations$ = this.contentService.state$;

  constructor(
    private readonly contentService: ContentService,
    private readonly navigationService: NavigationService
  ) {
  }

  addPresentation() {
    this.contentService.addPresentation({
      id: this.contentService.uniqueId(),
      name: 'new presentation',
      actions: [],
      slides: [],
      version: 0,
    });
  }

  goToPresentation(presentationId: string) {
    return this.navigationService.goToPresentation(presentationId)
  }

  deletePresentation(presentationId: string) {
    this.contentService.deletePresentation(presentationId);
  }
}
