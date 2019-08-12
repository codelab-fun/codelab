import { AfterViewInit, Directive, Input, OnDestroy, Optional } from '@angular/core';
import { SyncService} from '@codelab/utils/src/lib/sync/sync.service';
import { NgControl } from '@angular/forms';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SyncStatus } from '@codelab/utils/src/lib/sync/common';

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

    this.sync.statusChange$.pipe(takeUntil(this.onDestroy)).subscribe((status) => {
      console.log('when viewing');
      if (status === SyncStatus.VIEWING) {
        this.sync
          .getCurrentViewerValue(this.syncViewerValue)
          .pipe(first())
          .pipe(switchMap(value => {
            this.control.valueAccessor.writeValue(value);
            console.log('sub here');
            return this.control.valueChanges;
          })).subscribe((value) => {
          console.log('VALUE');
          this.sync.updateViewerValue(this.syncViewerValue, value);
        });
      }
    });
  }
}
