import { AfterViewInit, Directive, Input, OnDestroy, Optional } from '@angular/core';
import { SyncService, SyncStatus } from '@codelab/utils/src/lib/sync/sync.service';
import { NgControl } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncPresenterValue]',
  exportAs: 'presenterValue'

})
export class SyncPresenterValueDirective<T> implements AfterViewInit, OnDestroy {
  @Input() syncPresenterValue: string;
  private value: any;
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
    // this.sync.whenPresenting$.pipe(takeUntil(this.onDestroy)).subscribe(() => {
    //   this.sync.getPresenterValue(this.syncPresenterValue)
    //     .pipe(take(1)).pipe(switchMap(value => {
    //     this.control.valueAccessor.writeValue(value);
    //     return this.control.valueChanges;
    //   })).subscribe((value) => {
    //     const data = {[this.syncPresenterValue]: value} as T;
    //     this.sync.updatePresenterValue(data);
    //   });
    // });

    this.sync.statusChange$
      .pipe(
        switchMap(
          (status) =>
            status === SyncStatus.PRESENTING ?
              this.sync.getPresenterValue(this.syncPresenterValue) : EMPTY
        ),
        takeUntil(this.onDestroy)
      ).subscribe((value: string) => {
      if (this.control) {
        this.control.valueAccessor.writeValue(value);
      } else {
        this.value = value;
      }
    });


  }


}
