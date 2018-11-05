import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { SlideControls } from '../../../../presentation/src/lib/presentation/presentation.component';

@Component({
  selector: 'slides-deck',
  templateUrl: './deck.component.html',
  styleUrls: [
    './deck.component.scss'
  ]
})
export class SlidesDeckComponent implements SlideControls {
  slides: any[] = [];
  @Input() theme = 'basic';
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;
  activeSlideIndex = 0;

  addSlide(slide) {
    this.slides.push(slide)
  }

  nextSlide() {
    this.activeSlideIndex++;
  }

  previousSlide() {
    this.activeSlideIndex--;
  }

  canGoNext(): boolean {
    return this.activeSlideIndex + 1 < this.slides.length;
  }

  canGoPrevious(): boolean {
    return this.activeSlideIndex > 0;
  }
}
