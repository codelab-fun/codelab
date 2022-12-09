import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../admin/content/presentation-editor/services/content.service';

@Component({
  selector: 'slides-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: [
    './presentation.component.css',
    '../../shared/slide-styles.scss',],
})
export class PresentationComponent implements OnInit {
  readonly presentation$ = this.contentService.presentation$;


  constructor(
    private readonly contentService: ContentService,
  ) {
  }

  ngOnInit(): void {
  }
}
