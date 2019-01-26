import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[href]'
})
export class ExternalLinkDirectiveDirective {
  constructor(
    {nativeElement}: ElementRef
  ) {
    nativeElement.target = '_blank';
  }
}
