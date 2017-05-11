import { Directive, ElementRef, Input } from '@angular/core';
import {introJs} from 'intro.js/minified/intro.min.js';

@Directive({ selector: '[introJSintro]' })
export class IntroJSIntroDirective {
    constructor(el: ElementRef) {
      introJs().start();
    }
}
