import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, HostListener } from '@angular/core';
import {SlideComponent} from '../../presentation/slide/slide.component';
import {introJs} from 'intro.js/intro.js';

@Directive({
  selector: '[slidesIntrojsDirective]'
})
export class IntrojsDirective implements OnInit {

  constructor(public slide: SlideComponent) {
    if (!localStorage.numTours) {
      localStorage.numTours = 0;
    }
  }

  ngOnInit() {
    this.slide.onActive.subscribe((active) => {
      if (active && localStorage.numTours <= 2) {
        setTimeout(() => introJs().start(), 2000);
        localStorage.numTours = +localStorage.numTours + 1;
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
