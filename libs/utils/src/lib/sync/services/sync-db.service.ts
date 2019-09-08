import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { mergeValues } from '@codelab/utils/src/lib/sync/services/common';


@Injectable({
  providedIn: 'root'
})
export class SyncDbService {
  readonly online$ = this.object('.info/connected').valueChanges();
  readonly offset$: Observable<number> = this.object(of('/.info/serverTimeOffset')).valueChanges().pipe(map(a => Number(a)));

  constructor(private db: AngularFireDatabase) {
  }

  object<T>(key$: Observable<string> | string, defaultValue: T = null) {
    if (typeof key$ === 'string') {
      key$ = of(key$);
    }
    const db$ = key$.pipe(
      filter(k => !!k),
      map(key => this.db.object<T>(key)
      ));
    return new SyncDataObject<T>(db$, key$, this, defaultValue);
  }

  list<T>(key$: Observable<string> | string, defaultValue: T[] = []) {
    if (typeof key$ === 'string') {
      key$ = of(key$);
    }
    const db$ = key$.pipe(map(key => this.db.list<T>(key)));
    return new SyncDataList<T>(db$, key$, this, defaultValue);
  }
}


export class SyncDataObject<T> {
  private readonly valuesSubject = new BehaviorSubject(this.defaultValue);
  private readonly values$ = this.valuesSubject.asObservable();
  private readonly valueChanges$ = this.db$
    .pipe(
      switchMap(db => {
        return db.valueChanges();
      })
    )
    .pipe(
      map(value => {
        return mergeValues(value, this.defaultValue);
      })
    );
  private onDestroy: Subject<null> = new Subject<null>();

  constructor(
    protected readonly db$: Observable<AngularFireObject<T>>,
    protected readonly key$: Observable<string>,
    protected readonly syncDbService: SyncDbService,
    protected readonly defaultValue?: T
  ) {
    this.valueChanges$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(this.valuesSubject);
  }

  valueChanges(): Observable<T> {
    return this.values$;
  }

  updateWithCallback(callback: (value: T, index: number) => T) {
    this.valueChanges$
      .pipe(
        map(callback),
        tap(a => {
          console.log({a});
        }),
        first()
      )
      .subscribe(value => this.set(value));
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

  destroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  object(key$: Observable<string> | string, defaultValue?: any) {
    if (typeof key$ === 'string') {
      defaultValue =
        defaultValue || (this.defaultValue && this.defaultValue[key$]);
      key$ = of(key$);
    }

    const newKey$ = this.key$.pipe(
      switchMap(k =>
        (key$ as Observable<string>).pipe(map(key => `${k}/${key}`))
      )
    );
    return this.syncDbService.object(newKey$, defaultValue);
  }
}

export class SyncDataList<T> {
  values$ = this.db$.pipe(switchMap(db => db.valueChanges()));
  snapshots$ = this.db$.pipe(
    switchMap(db => {
      return db.snapshotChanges();
    })
  );

  constructor(
    protected readonly db$: Observable<AngularFireList<T>>,
    protected readonly key$: Observable<string>,
    protected readonly syncDbService: SyncDbService,
    protected readonly defaultValue?: T[]
  ) {
  }

  valueChanges(): Observable<T> {
    return this.values$.pipe(
      map(value => mergeValues(value, this.defaultValue))
    );
  }

  push(value: T) {
    return this.db$.pipe(first()).subscribe(db => db.push(value as any));
  }

  object<T>(key: string) {
    const key$ = this.key$.pipe(map(k => `${k}/${key}`));
    return this.syncDbService.object<T>(
      key$,
      this.defaultValue ? this.defaultValue[key] : this.defaultValue
    );
  }
}


