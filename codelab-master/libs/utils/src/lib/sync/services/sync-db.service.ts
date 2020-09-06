import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/database';
import { combineLatest, isObservable, Observable, of, Subject } from 'rxjs';
import { first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import {
  ArrayElement,
  FirebaseDb,
  mergeValues
} from '@codelab/utils/src/lib/sync/services/common';

@Injectable({
  providedIn: 'root'
})
export class SyncDbService<T> {
  constructor(private db: AngularFireDatabase) {}

  object<K extends keyof T>(key$: Observable<K> | K): SyncDataObject<T[K]> {
    if (!isObservable(key$)) {
      key$ = of(key$);
    }

    const keyString$ = key$.pipe(map(a => a.toString()));

    const db$ = keyString$.pipe(map(key => this.db.object<T[K]>(key)));

    // TODO(kirjs): Drop any
    return new SyncDataObject<T[K]>(db$, keyString$, this as any);
  }

  objectList<K extends keyof T, E extends keyof T[K]>(
    key$: Observable<K> | K
  ): SyncDataList<T[K][E]> {
    // TODO(kirjs): This whole function is only needed for typings.
    // firebase has no real arrays, and we kinda pretend it does
    return (this.list(key$) as unknown) as SyncDataList<T[K][E]>;
  }

  list<K extends keyof T>(
    key$: Observable<K> | K
  ): SyncDataList<ArrayElement<T[K]>> {
    if (!isObservable(key$)) {
      key$ = of(key$);
    }
    const keyString$ = key$.pipe(map(a => a.toString()));

    const db$ = keyString$.pipe(
      map(key => this.db.list<ArrayElement<T[K]>>(key))
    );
    // TODO(kirjs): Drop any
    return new SyncDataList<ArrayElement<T[K]>>(db$, keyString$, this as any);
  }
}

export class SyncDataObject<T> {
  private values$?: Observable<T>;
  private readonly valueChanges$: Observable<T> = this.db$.pipe(
    switchMap(db => {
      return db.valueChanges();
    }),
    map(value => {
      return mergeValues(value, this.defaultValue);
    })
  );

  private onDestroy: Subject<null> = new Subject<null>();

  constructor(
    protected readonly db$: Observable<AngularFireObject<T>>,
    protected readonly key$: Observable<string>,
    protected readonly syncDbService: SyncDbService<T>,
    protected readonly defaultValue?: Partial<T>
  ) {}

  valueChanges(): Observable<T> {
    if (!this.values$) {
      this.values$ = this.valueChanges$.pipe(shareReplay(1));
    }
    return this.values$;
  }

  updateWithCallback(callback: (value: T, index: number) => T) {
    this.valueChanges$
      .pipe(
        map(callback),
        tap(a => {
          console.log({ a });
        }),
        first()
      )
      .subscribe(value => this.set(value));
  }

  withDefault(defaultValue: Partial<T>): SyncDataObject<T> {
    return new SyncDataObject<T>(
      this.db$,
      this.key$,
      this.syncDbService,
      defaultValue
    );
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

  object<K extends keyof T>(key$: Observable<K> | K): SyncDataObject<T[K]> {
    if (!isObservable(key$)) {
      key$ = of(key$);
    }

    // TODO(kirjs): There should be a better way than casting to any
    const newKey$ = this.key$.pipe(
      switchMap(k => (key$ as Observable<K>).pipe(map(key => `${k}/${key}`)))
    ) as any;
    return this.syncDbService.object(newKey$);
  }

  list<K extends keyof T>(
    key$: Observable<K> | K
  ): SyncDataList<ArrayElement<T[K]>> {
    if (!isObservable(key$)) {
      key$ = of(key$);
    }
    const newKey$ = this.key$.pipe(
      switchMap(k => (key$ as Observable<K>).pipe(map(key => `${k}/${key}`)))
    ) as any;

    return this.syncDbService.list(newKey$);
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
    protected readonly syncDbService: SyncDbService<FirebaseDb>,
    protected readonly defaultValue?: T[]
  ) {}

  valueChanges(): Observable<T> {
    return this.values$.pipe(
      map(value => mergeValues(value, this.defaultValue))
    );
  }

  push(value: T) {
    return this.db$.pipe(first()).subscribe(db => db.push(value as any));
  }

  object(key: string): SyncDataObject<T> {
    const key$ = this.key$.pipe(map(k => `${k}/${key}`)) as any;
    return this.syncDbService.object(key$);
  }
}
