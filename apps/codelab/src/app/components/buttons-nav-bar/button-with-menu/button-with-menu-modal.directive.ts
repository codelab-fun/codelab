import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[modalContent]'
})
export class ButtonWithMenuModalDirective {

  @Input() slidesButtonWithMenuModal: any;

  constructor(
    readonly template: TemplateRef<any>
  ) {
  }

}
