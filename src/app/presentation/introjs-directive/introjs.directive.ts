import { Directive, Input, AfterViewInit, OnInit, AfterContentInit } from '@angular/core';
import {SlideComponent} from '../../presentation/slide/slide.component';
import {introJs} from 'intro.js/intro.js';

@Directive({
  selector: '[slidesIntrojsDirective]'
})
export class IntrojsDirective implements AfterViewInit {

  constructor(public slide: SlideComponent) {
    // console.log(slide);
  }

  ngAfterViewInit(): void {
    this.slide.onActive.subscribe((active) => {
      introJs().start();
    });
  }
}
