import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[href]'
})
// TODO(meinou): Remove the second postfix
export class ExternalLinkDirectiveDirective {
  constructor({ nativeElement }: ElementRef) {
    nativeElement.target = '_blank';
  }
}
