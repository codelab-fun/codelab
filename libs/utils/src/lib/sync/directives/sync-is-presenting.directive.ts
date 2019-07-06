import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[isPresenting]'
})
export class SyncIsPresentingDirective<T> {
  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly sync: SyncService<T>
  ) {
    sync.isPresenting$.subscribe(isPresening => {
      this.toggleContentDisplay(isPresening);
    });
  }

  toggleContentDisplay(isDisplayed: boolean) {
    if (isDisplayed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
