import { Component, HostListener } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'slides-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent {
  constructor(
    readonly navigationService: NavigationService,
    readonly contentService: ContentService
  ) {}

  presentationId = 'TBD';

  @HostListener('window:keydown.arrowleft')
  previousSlide() {
    this.navigationService.previousSlide(this.presentationId);
  }

  @HostListener('window:keydown.arrowright')
  nextSlide() {
    this.navigationService.nextSlide(this.presentationId);
  }
}
