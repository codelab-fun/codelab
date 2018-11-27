import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

interface AngularHooksContextImplicit<T> {
  get: T;

  set(value: T): void;
}

interface AngularHooksContext<T = any> {
  $implicit: AngularHooksContextImplicit<T>
}

@Directive({
  selector: '[useState]'
})
export class HooksDirective implements OnChanges {
  @Input() useStateOf: any;

  private context: AngularHooksContext = {
    $implicit: {
      get: this.useStateOf,
      set(value) {
        this.get = value;
      }
    }
  };

  constructor(vcr: ViewContainerRef, template: TemplateRef<AngularHooksContext>) {
    vcr.createEmbeddedView(template, this.context);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.context.$implicit.get = this.useStateOf;
  }

}
