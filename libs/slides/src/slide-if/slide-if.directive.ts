import {
  AfterViewInit, ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef,
  ViewContainerRef
} from '@angular/core';


import { PresentationComponent } from '../presentation/presentation.component';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[slidesIf]',

})
export class SlideIfDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() slidesIf: string;
  @Input() slidesIfMilestone?: string;
  private _created: boolean;
  private index: number;
  private slideSubscription: Subscription;

  constructor(private presentation: PresentationComponent,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.index = this.presentation.registerSlide(this.slidesIf, this.slidesIfMilestone);
    if (this.slidesIf) {
      this.slidesIf = 'slide-' + this.index;
    }
  }

  ngAfterViewInit() {
    this.slideSubscription = this.presentation.index.subscribe((index: number) => {
      (index === this.index) ? this._create() : this._destroy();
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.slideSubscription.unsubscribe();
  }

  private _create(): void {
    if (this._created) {
      return;
    }
    this.viewContainerRef.createEmbeddedView(this.templateRef);
    this._created = true;

  }

  private _destroy(): void {
    if (!this._created) {
      return;
    }
    this.viewContainerRef.clear();
    this._created = false;
  }
}
