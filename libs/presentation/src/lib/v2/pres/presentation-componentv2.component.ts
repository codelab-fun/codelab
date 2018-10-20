import { AfterContentInit, Component, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { SlideControls } from '../../presentation/presentation.component';

@Component({
  selector: 'angular-presentation-pres',
  templateUrl: './presentation-componentv2.component.html',
  styleUrls: [
    './presentation-componentv2.component.css',
    '../../presentation/presentation.component.scss'
  ]
})
export class PresentationComponentV2 implements AfterContentInit, SlideControls {
  slides: any[] = [];
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;
  activeSlideIndex: number;

  constructor() {

  }

  ngAfterContentInit() {
    this.slides = this.templates.toArray().map((template, index) => {
      return {
        id: Object.keys((template as any)._def.references)[0] || index,
        template,
        index
      }
    });
    console.log(this.slides[0]);
    this.activeSlideIndex = 0;
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
