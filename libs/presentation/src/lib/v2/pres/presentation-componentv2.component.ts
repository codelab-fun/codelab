import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { SlideControls } from '../../presentation/presentation.component';

@Component({
  selector: 'angular-presentation-pres',
  templateUrl: './presentation-componentv2.component.html',
  styleUrls: [
    './presentation-componentv2.component.scss'
  ]
})
export class PresentationComponentV2 implements SlideControls {
  slides: any[] = [];
  @Input() theme = 'basic';
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;
  activeSlideIndex = 0;

  constructor() {

  }

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
