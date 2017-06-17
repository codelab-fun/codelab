import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myNgIf]'
})
export class MyNgIfDirective implements OnInit {
  @Input() set myNgIf(val: boolean) {
    if (val) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    console.log(this.myNgIf);
  }
}
