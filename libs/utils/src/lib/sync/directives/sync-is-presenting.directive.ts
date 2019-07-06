import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { SyncService, SyncStatus } from '@codelab/utils/src/lib/sync/sync.service';

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
    sync.statusChange$.subscribe(status => {
      this.toggleContentDisplay(status === SyncStatus.PRESENTING);
    });
  }

  toggleContentDisplay(isDisplayed: boolean) {
    this.viewContainer.clear();
    if (isDisplayed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
