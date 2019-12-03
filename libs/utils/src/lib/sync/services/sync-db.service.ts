import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/database';
import { isObservable, Observable, of, Subject } from 'rxjs';
import {
  filter,
  first,
  map,
  shareReplay,
  switchMap,
  tap
} from 'rxjs/operators';
import {
  FirebaseDb,
  mergeValues
} from '@codelab/utils/src/lib/sync/services/common';

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

@Injectable({
  providedIn: 'root'
})
export class SyncDbService<T extends FirebaseDb> {
  readonly online$ = this.object('.info')
    .object('connected')
    .valueChanges();
  readonly offset$: Observable<number> = this.object('.info')
    .object('serverTimeOffset')
    .valueChanges()
    .pipe(map(a => Number(a)));

  constructor(private db: AngularFireDatabase) {}

  object<K extends keyof T>(key$: Observable<K> | K): SyncDataObject<T[K]> {
    if (!isObservable(key$)) {
      key$ = of(key$);
    }

    // TODO(kirjs): At this point key$ is always an observable and this check
    // is redundant.
    if (isObservable(key$)) {
      const db$ = key$.pipe(
        filter(k => !!k),
        // TODO(kirjs): Do we need to cast here?
        map(key => this.db.object<T>(key as string))
      ) as any;
      // TODO(kirjs): Do we need to cast here?
      return new SyncDataObject<T[K]>(db$, key$ as Observable<string>, this);
    }
  }

  list<K extends keyof T, E extends keyof T[K]>(
    key$: Observable<K> | K
  ): SyncDataList<T[K][E]> {
    if (!isObservable(key$)) {
      key$ = of(key$);
    }
    // TODO(kirjs): Do we need to cast here?
    const db$ = key$.pipe(map(key => this.db.list<T>(key as any))) as any;
    // TODO(kirjs): Do we need to cast here?
    return new SyncDataList<T>(db$, key$ as any, this) as any;
  }
}

export class SyncDataObject<T> {
  private values$?: Observable<T>;
  private readonly valueChanges$: Observable<T> = this.db$
    .pipe(
      switchMap(db => {
        return db.valueChanges();
      })
    )
    .pipe(
      map(value => {
        // TODO(kirjs): figure this out
        return mergeValues(value, this.defaultValue);
      })
    );
  private onDestroy: Subject<null> = new Subject<null>();

  constructor(
    protected readonly db$: Observable<AngularFireObject<T>>,
    protected readonly key$: Observable<string>,
    protected readonly syncDbService: SyncDbService<FirebaseDb>,
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
    if (typeof key$ === 'string') {
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
    if (typeof key$ === 'string') {
      key$ = of(key$);
    }

    // TODO(kirjs): There should be a better way than casting to any
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
