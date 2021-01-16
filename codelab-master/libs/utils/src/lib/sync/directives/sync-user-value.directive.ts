import { Directive, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  first,
  mergeMapTo,
  takeUntil,
  tap
} from 'rxjs/operators';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { LoginService } from '@codelab/firebase-login';
import { SyncDb } from '@codelab/utils/src/lib/sync/services/sync-data.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncUserValue]',
  exportAs: 'presenterValue'
})
export class SyncUserValueDirective<T> implements OnInit, OnDestroy {
  @Input() syncUserValue: string;
  @Input() syncUserValueDefault: T;

  private onDestroy$ = new Subject();

  constructor(
    private readonly dbService: SyncDbService<SyncDb>,
    private readonly loginService: LoginService,
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

    const syncDataObject = this.dbService
      .object('user-data')
      .object(this.loginService.uid$)
      .object(this.syncUserValue);
    const dataValue$ = syncDataObject.valueChanges();

    dataValue$.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      console.log('FROM STORE', value);
      this.control.valueAccessor.writeValue(value);
    });

    dataValue$
      .pipe(
        tap(a => {
          console.log('data', a);
        }),
        first(),
        mergeMapTo(this.control.valueChanges),
        filter(a => a !== undefined),
        distinctUntilChanged(),
        takeUntil(this.onDestroy$)
      )
      .subscribe(newValue => {
        console.log('FROM CONTROL', newValue);
        syncDataObject.set(newValue);
      });
  }
}
