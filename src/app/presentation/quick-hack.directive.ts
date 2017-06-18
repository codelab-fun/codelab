import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PresentationComponent } from './presentation/presentation.component';

@Directive({
  selector: '[slidesQuickHack]'
})
export class QuickHackDirective implements OnInit {

  @Input() slidesQuickHack: string;
  private index: number;

  constructor(public presentation: PresentationComponent, public templateRef: TemplateRef<any>, public vr: ViewContainerRef) {

  }

  display(displayed) {
    displayed ? this.vr.createEmbeddedView(this.templateRef) : this.vr.clear();
  }

  ngOnInit() {
    this.index = this.presentation.registerSlide(this.slidesQuickHack, 'todo');

    this.display(this.presentation.activeSlideIndex === this.index);
    this.presentation.onSlideChange.subscribe(index => {
      this.display(index === this.index);
    });

    // slide.onActive.subscribe(active => active ? vr.createEmbeddedView(templateRef) : vr.clear());
    // slide.ngOnInit();
  }

}
