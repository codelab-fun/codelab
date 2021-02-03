import { Component, HostListener } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'slides-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  constructor(readonly contentService: ContentService) {}
  presentationId = 'TBD';

  @HostListener('window:keydown.arrowleft')
  previousSlide() {
    this.contentService.previousSlide(this.presentationId);
  }

  @HostListener('window:keydown.arrowright')
  nextSlide() {
    this.contentService.nextSlide(this.presentationId);
  }
}
