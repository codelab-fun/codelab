import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../admin/content/presentation-editor/services/navigation.service';
import { ContentService } from '../../admin/content/presentation-editor/services/content.service';

@Component({
  selector: 'slides-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
})
export class PresentationComponent implements OnInit {
  constructor(
    readonly contentService: ContentService
  ) {}

  ngOnInit(): void {}
}
