import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[href]'
})
export class ExternalLinkDirectiveDirective {


  constructor(
    private element: ElementRef
  ) {
    console.log('stuff', this.element.nativeElement);
    this.element.nativeElement.target = '_blank';
  }

  onNavigate(){
    // window.open(this.href, "_blank");
}

}
