import { Directive, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  SyncDataService,
  ViewerConfig
} from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { filter, map, takeUntil } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncViewerValue]',
  exportAs: 'viewerValue'
})
export class SyncViewerValueDirective<T> implements OnDestroy, OnInit {
  @Input() syncViewerValue: keyof ViewerConfig;
  @Input() syncViewerValueDefault: T;

  private onDestroy$ = new Subject();

  constructor(
    private readonly syncDataService: SyncDataService,
    @Optional() private readonly control: NgControl
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    if (!this.control) {
      throw new Error(
        'syncPresenterValue directive must be attached to a formControl'
      );
    }

    const data = this.syncDataService.getCurrentViewerObject(
      this.syncViewerValue
    );

    data
      .valueChanges()
      .pipe(
        takeUntil(this.onDestroy$),
        map(a => (a === undefined ? this.syncViewerValueDefault : a))
      )
      .subscribe(value => {
        this.control.valueAccessor.writeValue(value);
      });

    this.control.valueChanges
      .pipe(
        filter(a => a !== undefined),
        takeUntil(this.onDestroy$)
      )
      .subscribe(newValue => {
        data.set(newValue);
      });
  }
}
