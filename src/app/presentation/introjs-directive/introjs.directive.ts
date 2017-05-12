import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, HostListener } from '@angular/core';
import {SlideComponent} from '../../presentation/slide/slide.component';
import {introJs} from 'intro.js/intro.js';

@Directive({
  selector: '[slidesIntrojsDirective]'
})
export class IntrojsDirective implements OnInit {

  private numTours = 0;

  constructor(public slide: SlideComponent) {
    ++this.numTours;
  }

  ngOnInit() {
    this.slide.onActive.subscribe((active) => {
      if (this.numTours > 2) {
        localStorage.setItem('touristLevel', 'expert');
      }
      if (active && !localStorage.getItem('touristLevel')) {
        setTimeout(() => introJs().start(), 2000);
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
