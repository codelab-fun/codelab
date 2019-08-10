import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { SyncService, SyncStatus } from '@codelab/utils/src/lib/sync/sync.service';

export class SyncIsStatusDirective<T> implements OnInit {
  protected readonly status: SyncStatus = SyncStatus.OFF;

  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly sync: SyncService<T>
  ) {
  }

  ngOnInit() {
    this.sync.statusChange$.subscribe(status => {
      this.toggleContentDisplay(status === this.status);
    });
  }

  toggleContentDisplay(isDisplayed: boolean) {
    this.viewContainer.clear();
    if (isDisplayed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[isViewing]'
})
export class SyncIsViewingDirective<T> extends SyncIsStatusDirective<T> {
  protected readonly status = SyncStatus.VIEWING;

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<any>,
    sync: SyncService<T>
  ) {
    super(viewContainer, templateRef, sync);
    console.log('init');
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[isPresenting]'
})
export class SyncIsPresentingDirective<T> extends SyncIsStatusDirective<T> {
  protected readonly status = SyncStatus.PRESENTING;

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<any>,
    sync: SyncService<T>
  ) {
    super(viewContainer, templateRef, sync);
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[isAdmin]'
})
export class SyncIsAdminDirective<T> extends SyncIsStatusDirective<T> {
  protected readonly status = SyncStatus.ADMIN;

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<any>,
    sync: SyncService<T>
  ) {
    super(viewContainer, templateRef, sync);
  }
}
