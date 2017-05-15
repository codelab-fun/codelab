import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, HostListener } from '@angular/core';
import {SlideComponent} from '../../presentation/slide/slide.component';
import {introJs} from 'intro.js/intro.js';

@Directive({
  selector: '[slidesIntrojsDirective]'
})
export class IntrojsDirective implements OnInit {

  constructor(public slide: SlideComponent) {
    // TODO: add check back in after google i/o
    // if (!localStorage.numTours) {
    //   localStorage.numTours = 0;
    // }
  }

  ngOnInit() {
    this.slide.onActive.subscribe((active) => {
      // check if both tours ran TODO: unhardcode this check
      // if (active && localStorage.numTours <= 2) {
      if (active) {
        setTimeout(() => introJs().start(), 1000);
        // localStorage.numTours = +localStorage.numTours + 1;

        // @HostListener('keydown') handleKeyboardEvent(eventData: Event) {
        //   alert("eventData");
        // }
      }
    });
  }

  // ngAfterViewInit(): void {
  //   this.slide.onActive.subscribe((active) => {
  //     active ? introJs().start() : introJs().exit();
  //   });
  // }
}
