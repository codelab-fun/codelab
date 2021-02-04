import { Component, OnInit } from '@angular/core';
import { ContentService } from '../presentation-editor/content.service';

@Component({
  selector: 'slides-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css']
})
export class PresentationListComponent implements OnInit {
  presentations$ = this.contentService.presentations.valueChanges();
  constructor(private readonly contentService: ContentService) {}

  ngOnInit(): void {}

  createPresentation() {
    this.contentService.presentations.add({
      id: this.contentService.uniqueId(),
      name: 'new presentation',
      actions: [],
      slides: [],
      version: 0
    });
  }
}
