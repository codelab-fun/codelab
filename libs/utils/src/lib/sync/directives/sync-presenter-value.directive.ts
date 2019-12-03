import { Directive, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  PresenterConfig,
  SyncDataService
} from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { filter, map, takeUntil } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncPresenterValue]',
  exportAs: 'presenterValue'
})
export class SyncPresenterValueDirective<
  K extends keyof PresenterConfig,
  T extends PresenterConfig[K]
> implements OnInit, OnDestroy {
  @Input() syncPresenterValue: K;
  @Input() syncPresenterValueDefault: T;

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

    const data = this.syncDataService.getPresenterObject(
      this.syncPresenterValue
    );
    data
      .valueChanges()
      .pipe(
        map(a => (a === undefined ? this.syncPresenterValueDefault : a)),
        takeUntil(this.onDestroy$)
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
