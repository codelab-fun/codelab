import { AfterViewInit, Directive, Input, OnDestroy, Optional } from '@angular/core';
import { SyncService } from '@codelab/utils/src/lib/sync/services/sync.service';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncViewerValue]',
  exportAs: 'viewerValue'

})
export class SyncViewerValueDirective<T> implements AfterViewInit, OnDestroy {
  @Input() syncViewerValue: string;
  private onDestroy = new Subject();

  constructor(
    private readonly sync: SyncService<T>,
    @Optional() private readonly control: NgControl
  ) {

  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngAfterViewInit() {

  }
}
