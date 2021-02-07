import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { Location } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'slides-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
  @Input() slides;
  @Output() reorder = new EventEmitter();
  @Input() currentSlideIndex = 0;
  @Input() presentationId!: string;

  constructor(
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly contentService: ContentService,
    readonly navigationService: NavigationService
  ) {}

  addSlide() {
    this.contentService.addSlide(this.presentationId);
  }

  @HostListener('keydown.arrowdown')
  nextSlide() {
    this.navigationService.nextSlide(this.presentationId);
  }

  @HostListener('keydown.arrowup')
  prevSlide() {
    this.navigationService.previousSlide(this.presentationId);
  }
}
