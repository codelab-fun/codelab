import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[href]',
})
// TODO(meinou): Remove the second postfix
export class ExternalLinkDirectiveDirective {
  constructor({ nativeElement }: ElementRef) {
    nativeElement.target = '_blank';
  }
}
