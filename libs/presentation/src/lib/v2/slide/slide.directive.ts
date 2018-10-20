import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[angularPresentationSlide]'
})
export class SlideDirective {
  @Input() class;

  constructor(private template: TemplateRef<any>, private  el: ElementRef) {

  }

  ngOnInit() {
    debugger;
  }

}
