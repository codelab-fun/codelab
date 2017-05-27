import { Directive, OnInit, ElementRef } from '@angular/core';
import { SlideComponent } from "app/presentation/slide/slide.component";

@Directive({
  selector: '[slidesTourLinterWarningDirective]'
})
export class TourLinterWarningDirective implements OnInit {

  constructor(public slide: SlideComponent, private el: ElementRef) {

  }

  ngOnInit() {
    this.slide.onActive.subscribe((active) => {
      if (active) {
      let squiggly;
      setTimeout(() => {
        squiggly = document.querySelector('.highlighted-code');
        console.log(document);

        console.log('I\'m running!');
        console.log(squiggly);
        squiggly.setAttribute('data-step', '3');
        squiggly.setAttribute('data-intro', 'Code errors will be underscored by a squiggly red line.');
        debugger;
      }, 500);


      // } else {
      //   squiggly.removeAttribute('data-step');
      //   squiggly.removeAttribute('data-intro');
      }
    });
  }
};
