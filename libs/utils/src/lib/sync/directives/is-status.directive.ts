import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { SyncStatus } from '@codelab/utils/src/lib/sync/common';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';

export class SyncIsStatusDirective<T> implements OnInit {
  protected readonly status: SyncStatus = SyncStatus.OFF;

  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly syncSession: SyncSessionService,
  ) {
  }

  ngOnInit() {
    this.syncSession.status$.subscribe(status => {
      this.toggleContentDisplay(status === this.status);
    });
  }

  toggleContentDisplay(isDisplayed: boolean) {
    this.viewContainer.clear();
    if (isDisplayed) {
      this.viewContainer.createEmbeddedView(this.templateRef).markForCheck();
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
    syncSession: SyncSessionService,
  ) {
    super(viewContainer, templateRef, syncSession);
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
    syncSession: SyncSessionService,
  ) {
    super(viewContainer, templateRef, syncSession);
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
    syncSession: SyncSessionService,
  ) {
    super(viewContainer, templateRef, syncSession);
  }
}
