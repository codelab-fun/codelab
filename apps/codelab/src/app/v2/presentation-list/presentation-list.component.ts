import { Component } from '@angular/core';
import { ContentService } from '../../admin/content/presentation-editor/services/content.service';
import { NavigationService } from '../../admin/content/presentation-editor/services/navigation.service';

@Component({
  selector: 'slides-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css'],
})
export class PresentationListComponent {
  presentations$ = this.contentService.state$;

  constructor(
    private readonly contentService: ContentService,
    readonly navigationService: NavigationService
  ) {}
}
