import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { PresentationComponent } from '../presentation/presentation.component';

@Directive({
  selector: '[slideIf]'
})
export class SlideIfDirective {
  @Input('slideIf') id: string;
  @Input('slideIfMilestone') milestone?: string;
  private _created: boolean;
  private _index: number;
  private _watcher: Subscription;

  constructor(private _presentation: PresentationComponent, private _templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this._index = this._presentation.registerSlide(this.id, this.milestone);
    this._watcher = this._presentation.index.subscribe((index: number) => {
      (index === this._index) ? this._create() : this._destroy();
    });
  }

  ngOnDestroy() {
    this._watcher.unsubscribe();
  }

  private _create(): void {
    if (this._created) return;
    this._viewContainerRef.createEmbeddedView(this._templateRef);
    this._created = true;
  }

  private _destroy(): void {
    if (!this._created) return;
    this._viewContainerRef.clear();
    this._created = false;
  }
}