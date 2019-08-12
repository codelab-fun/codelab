import { Directive, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { SyncDataService } from '@codelab/utils/src/lib/sync/sync-data.service';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncPresenterValue]',
  exportAs: 'presenterValue'

})
export class SyncPresenterValueDirective<T> implements OnInit, OnDestroy {
  @Input() syncPresenterValue: string;
  @Input() syncPresenterValueDefault: T;
  private value: any;
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

    const data = this.syncDataService.getPresenterObject(this.syncPresenterValue, this.syncPresenterValueDefault);

    data.valueChanges()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        console.log({value});
        this.control.valueAccessor.writeValue(value)});

    this.control.valueChanges
      .pipe(
        filter(a => a !== undefined),
        takeUntil(this.onDestroy$)
      )
      .subscribe(newValue => {
        console.log({newValue});

        data.update(newValue);
      });
  }
}
