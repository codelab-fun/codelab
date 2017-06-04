import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { SlideComponent } from '../../presentation/slide/slide.component';
import { introJs } from 'intro.js/intro.js';

declare const require;

@Directive({
  selector: '[slidesIntroJs]'
})
export class IntrojsDirective implements OnInit, OnDestroy {
  @Input() introJsBefore: Function;

  @Input() introJsAfter: Function;
  constructor(public slide: SlideComponent) {
    // TODO: add check back in after google i/o
    // if (!localStorage.numTours) {
    //   localStorage.numTours = 0;
    // }

    require('style-loader!../node_modules/intro.js/minified/introjs.min.css');
    require('style-loader!../node_modules/intro.js/themes/introjs-nassim.css');
  }

  ngOnInit() {
    this.slide.onActive.subscribe((active) => {
      // check if both tours ran TODO: unhardcode this check
      // if (active && localStorage.numTours <= 2) {
      if (active) {
        setTimeout(() => {
          if (this.introJsBefore) {
            this.introJsBefore();
          }

          const tour = introJs();
          tour.start();
          tour.oncomplete(() => {
            this.introJsAfter();
            tour.addHints();
          });
        }, 1000);

        // localStorage.numTours = +localStorage.numTours + 1;

        // @HostListener('keydown') handleKeyboardEvent(eventData: Event) {
        //   alert("eventData");
        // }
      }

    });
  }

  ngOnDestroy(): void {
    if (this.introJsAfter) {
      this.introJsAfter();
    }
  }


  // ngAfterViewInit(): void {
  //   this.slide.onActive.subscribe((active) => {
  //     active ? introJs().start() : introJs().exit();
  //   });
  // }
}
