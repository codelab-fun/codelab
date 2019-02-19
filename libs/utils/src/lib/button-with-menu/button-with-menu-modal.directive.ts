import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[modalContent]'
})
export class ButtonWithMenuModalDirective {

  constructor(
    readonly template: TemplateRef<any>
  ) {
  }

}
