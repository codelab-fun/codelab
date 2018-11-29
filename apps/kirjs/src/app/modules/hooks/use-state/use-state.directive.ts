
import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[useState]'
})
export class UseStateDirective implements OnChanges {
  @Input() useStateOf: any;

  private context: any = {
    $implicit: {
      // We can't do array destructuring in Angular templates, so have to settle on an object.
      get: this.useStateOf,
      set(value: any) {
        this.get = value;
      }
    }
  };

  constructor(vcr: ViewContainerRef, template: TemplateRef<any>) {
    // We're in a structural directive. This displays the template.
    vcr.createEmbeddedView(template, this.context);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Every time value changes, set it on the get.
    this.context.$implicit.get = this.useStateOf;
  }
}
