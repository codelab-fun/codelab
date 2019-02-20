import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[codelabModalContent]'
})
export class ButtonWithMenuModalDirective {

  constructor(
    readonly template: TemplateRef<any>
  ) {
  }

}
