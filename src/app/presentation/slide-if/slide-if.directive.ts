import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';


import { PresentationComponent } from '../presentation/presentation.component';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[slidesIf]'
})
export class SlideIfDirective implements OnInit, OnDestroy {
  @Input() slidesIf: string;
  @Input() slidesIfMilestone?: string;
  private _created: boolean;
  private index: number;
  private slideSubscription: Subscription;

  constructor(private _presentation: PresentationComponent,
              private _templateRef: TemplateRef<any>,
              private _viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.index = this._presentation.registerSlide(this.slidesIf, this.slidesIfMilestone);
    this.slideSubscription = this._presentation.index.subscribe((index: number) => {
      (index === this.index) ? this._create() : this._destroy();
    });
  }

  ngOnDestroy() {
    this.slideSubscription.unsubscribe();
  }

  private _create(): void {
    if (this._created) {
      return;
    }
    this._viewContainerRef.createEmbeddedView(this._templateRef);
    this._created = true;
  }

  private _destroy(): void {
    if (!this._created) {
      return;
    }
    this._viewContainerRef.clear();
    this._created = false;
  }
}
