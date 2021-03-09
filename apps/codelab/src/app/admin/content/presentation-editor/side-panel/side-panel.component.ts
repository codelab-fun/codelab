import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

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
    readonly contentService: ContentService,
    readonly navigationService: NavigationService
  ) {}

  addSlide() {
    this.contentService.addSlide(this.presentationId);
  }

  @HostListener('keydown.arrowdown')
  nextSlide() {
    this.navigationService.nextSlide();
  }

  @HostListener('keydown.arrowup')
  prevSlide() {
    this.navigationService.previousSlide();
  }
}
