import { AfterViewInit, Directive, Input, OnDestroy, Optional } from '@angular/core';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { NgControl } from '@angular/forms';
import { switchMap, take, takeUntil } from 'rxjs/operators';
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

    this.sync.whenViewing$.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      console.log('when viewing');

      this.sync.getViewerValue(this.syncViewerValue)
        .pipe(take(1)).pipe(switchMap(value => {
        this.control.valueAccessor.writeValue(value);
        console.log('sub here');
        return this.control.valueChanges;
      })).subscribe((value) => {
        console.log('VALUE');
        this.sync.updateViewerValue(this.syncViewerValue, value);
      });
    });
  }
}
