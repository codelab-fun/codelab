// import { ViewContainerRef } from './../../../../../../../libs/code-demos/src/lib/shared/types-not-really.d';

import { Directive, ElementRef, EventEmitter, Output, AfterViewInit, HostListener, TemplateRef, ViewContainerRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[intersectionObserver]'
})
export class IntersectionObserverDirective implements AfterViewInit {
  // @Output() public intersectionObserver: EventEmitter<any> = new EventEmitter();

  private _intersectionObserver?: IntersectionObserver;
  constructor(private _element: ElementRef,
              private template: TemplateRef<any>,
              private container: ViewContainerRef
              ) { }

  public ngAfterViewInit () {
    // console.log('happening');
    this._intersectionObserver = new IntersectionObserver(entries => {
        this.checkForIntersection(entries);
    }, {});


    this._intersectionObserver.observe(<Element>(this._element.nativeElement.parentElement));
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
        if (this.checkIfIntersecting(entry)) {
            this.container.createEmbeddedView(this.template);
            this._intersectionObserver.unobserve(<Element>(this._element.nativeElement.parentElement));
            this._intersectionObserver.disconnect();
        }
    });
  }

  private checkIfIntersecting (entry: IntersectionObserverEntry) {

      return (entry).isIntersecting && entry.target === this._element.nativeElement.parentElement;
  }
}
