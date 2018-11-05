import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
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
  @Output() onSlideChange = new EventEmitter<number>();
  @Output() onSlideAdded = new EventEmitter<{ index: number, id: string }>();

  addSlide(slide) {
    this.slides.push(slide)
  }

  goToSlide(index: number) {
    this.activeSlideIndex = index;
    this.onSlideChange.emit(index);
  }

  nextSlide() {
    this.goToSlide(this.activeSlideIndex + 1);
  }

  previousSlide() {
    this.goToSlide(this.activeSlideIndex - 1);
  }

  canGoNext(): boolean {
    return this.activeSlideIndex + 1 < this.slides.length;
  }

  canGoPrevious(): boolean {
    return this.activeSlideIndex > 0;
  }
}
