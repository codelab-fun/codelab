import { Directive, Input, AfterViewInit, OnInit, AfterContentInit } from '@angular/core';
import {SlideComponent} from '../../presentation/slide/slide.component';
import {introJs} from 'intro.js/intro.js';

@Directive({
  selector: '[slidesIntrojsDirective]'
})
export class IntrojsDirective implements OnInit {

  constructor(public slide: SlideComponent) {
  }

  ngOnInit() {
    this.slide.onActive.subscribe((active) => {
      if (active) {
        setTimeout(() => introJs().start(), 2000);
      }
    });
  }

  // ngAfterViewInit(): void {
  //   this.slide.onActive.subscribe((active) => {
  //     active ? introJs().start() : introJs().exit();
  //   });
  // }
}
