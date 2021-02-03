import { Component, OnInit } from '@angular/core';
import { ContentService } from './content.service';

declare const require;

@Component({
  selector: 'slides-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  slides$ = this.contentService.slides$;
  selectedSlide$ = this.contentService.selectedSlide$;
  readonly presentationId = 'lol';

  constructor(readonly contentService: ContentService) {}

  addSlide() {
    this.contentService.addSlide(this.presentationId);
  }

  reorder(move) {
    // this.contentService.setCode(
    //   moveSlide(
    //     this.contentService.code$.value,
    //     move.previousIndex,
    //     move.currentIndex
    //   )
    // );
  }
}
