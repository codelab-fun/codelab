import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { AngularFireList, AngularFireObject } from '@angular/fire/database';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';

function mergeValues(value, defaultValue) {
  if (value === null) {
    return defaultValue;
  }

  if (typeof value === 'object' && typeof defaultValue === 'object') {
    return {...defaultValue, ...value};
  }

  return typeof value === 'undefined' ? defaultValue : value;
}

export class SyncDataObject<T> {
  private readonly valuesSubject = new BehaviorSubject(this.defaultValue);
  private readonly values$ = this.valuesSubject.asObservable();
  private readonly valueChanges$ = this.db$.pipe(
    switchMap(db => {
      return db.valueChanges();
    }))
    .pipe(
      map(value => {
        return mergeValues(value, this.defaultValue);
      })
    );

  constructor(
    protected readonly db$: Observable<AngularFireObject<T>>,
    protected readonly key$: Observable<string>,
    protected readonly syncDbService: SyncDbService,
    protected readonly defaultValue?: T,
  ) {
    this.valueChanges$.subscribe(this.valuesSubject);
  }

  valueChanges(): Observable<T> {
    return this.values$;
  }

  updateWithCallback(
    callback: ((value: T, index: number) => T)
  ) {
    this.valueChanges$.pipe(
      map(callback),
      first()
    ).subscribe(value => this.set(value));
  }

  set(value: T) {
    return this.db$.pipe(first()).subscribe(db => {
      db.set(value);
    });
  }

  remove() {
    this.db$.pipe(first()).subscribe(db => {
      db.remove();
    });
  }

  object(key$: Observable<string> | string, defaultValue?: any) {
    if (typeof key$ === 'string') {
      defaultValue = defaultValue || this.defaultValue[key$];
      key$ = of(key$);
    }


    const newKey$ = this.key$.pipe(switchMap(k => (key$ as Observable<string>).pipe(map(key => `${k}/${key}`))));
    return this.syncDbService.object(newKey$, defaultValue);
  }
}

export class SyncDataList<T> {
  values$ = this.db$.pipe(switchMap(db => db.valueChanges()));
  snapshots$ = this.db$.pipe(switchMap(db => db.snapshotChanges()));

  constructor(
    protected readonly db$: Observable<AngularFireList<T>>,
    protected readonly key$: Observable<string>,
    protected readonly syncDbService: SyncDbService,
    protected readonly defaultValue?: T[]
  ) {
  }

  valueChanges(): Observable<T> {
    return this.values$
      .pipe(
        map(value => mergeValues(value, this.defaultValue))
      );
  }

  push(value: T) {
    return this.db$.pipe(first()).subscribe(db => db.push(value as any));
  }

  object<T>(key: string) {
    const key$ = this.key$.pipe(map(k => `${k}/${key}`));
    return this.syncDbService.object<T>(key$, this.defaultValue ? this.defaultValue[key] : this.defaultValue);
  }
}
