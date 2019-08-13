import { Directive, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncViewerValue]',
  exportAs: 'viewerValue'

})
export class SyncViewerValueDirective<T> implements OnDestroy, OnInit {
  @Input() syncViewerValue: string;
  @Input() syncViewerValueDefault: T;

  private onDestroy$ = new Subject();

  constructor(
    private readonly syncDataService: SyncDataService,
    @Optional() private readonly control: NgControl
  ) {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  ngOnInit() {
    if (!this.control) {
      throw new Error('syncPresenterValue directive must be attached to a formControl');
    }

    const data = this.syncDataService.getCurrentViewerObject<T>(this.syncViewerValue, this.syncViewerValueDefault);

    data.valueChanges()
      .pipe(takeUntil(this.onDestroy$))
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
