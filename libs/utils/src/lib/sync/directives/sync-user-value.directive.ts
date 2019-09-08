import { Directive, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  mergeMapTo,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { LoginService } from '@codelab/firebase-login';

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
    private readonly dbService: SyncDbService,
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
    const $key = this.loginService.uid$.pipe(
      map(uid => `user-data/${uid}/${this.syncUserValue}`)
    );

    const dataValue$ = this.control.valueChanges.pipe(
      filter(a => a !== undefined),
      first(),
      switchMap(defaultValue => {
        console.log({ defaultValue });
        return this.dbService.object($key, defaultValue).valueChanges();
      })
    );

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
        const service = this.dbService.object($key);
        service.set(newValue);
        service.destroy();
      });
  }
}
