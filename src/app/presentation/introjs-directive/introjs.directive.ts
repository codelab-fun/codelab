import { Directive, Input, OnInit } from '@angular/core';
import { SlideComponent } from '../slide/slide.component';
import { introJs } from 'intro.js/intro.js';

declare const require;

@Directive({
  selector: '[slidesIntroJs]'
})
export class IntrojsDirective implements OnInit {
  constructor(public slide: SlideComponent) {
  }

  ngOnInit() {
    this.slide.onActive.subscribe((active) => {
      const lsId = `slide-intro-${ this.slide.id }`;
      if (active && !localStorage[lsId]) {
        if (active) {
          setTimeout(() => {
            introJs()
              .start()
              .oncomplete(() => {
                localStorage[lsId] = this.slide.id;
            });
          }, 1000);
        }
      }
    });
  }
}
