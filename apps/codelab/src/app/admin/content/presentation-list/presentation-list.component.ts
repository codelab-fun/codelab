import { Component, OnInit } from '@angular/core';
import { ContentService } from '../presentation-editor/services/content.service';
import { NavigationService } from '../presentation-editor/services/navigation.service';

@Component({
  selector: 'slides-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css']
})
export class PresentationListComponent {
  presentations$ = this.contentService.state$;

  constructor(
    private readonly contentService: ContentService,
    private readonly navigationService: NavigationService
  ) {}

  addPresentation() {
    const presentation = {
      id: this.contentService.uniqueId(),
      name: 'new presentation',
      actions: [],
      slides: [],
      version: 0
    };

    this.contentService.addPresentation(presentation);
  }

  deletePresentation(presentationId: string) {
    this.contentService.deletePresentation(presentationId);
  }
}
