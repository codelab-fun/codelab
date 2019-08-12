import { Injectable } from '@angular/core';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

function mergeValues(value, defaultValue) {
  if (typeof value === 'object' && typeof defaultValue === 'object') {
    return {...defaultValue, ...value};
  }

  return typeof value === 'undefined' ? defaultValue : value;
}

export class SyncDataObject<T> {
  db$ = this.key$.pipe(map(key => this.syncService.getObjectByKey<T>(key)));

  readonly values$ = new BehaviorSubject(this.defaultValue);
  readonly valueChanges$ = this.db$.pipe(
    tap(a => console.log({a})),
    switchMap(db => {
      return db.valueChanges();
    }))
    .pipe(
      map(value => {
        return mergeValues(value, this.defaultValue);
      })
    );

  constructor(
    protected readonly syncService: SyncService<any>,
    protected readonly key$: Observable<string>,
    protected readonly defaultValue?: T
  ) {
    this.valueChanges$.subscribe(this.values$);
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
    ).subscribe(value => this.update(value));
  }

  update(value: T) {
    return this.db$.pipe(first()).subscribe(db => {
      db.set(value);
    });
  }

  getObject(key: keyof T) {
    const key$ = this.key$.pipe(map(k => `${k}/${key}`));
    return new SyncDataObject(this.syncService, key$, this.defaultValue[key]);
  }
}

export class SyncDataList<T> {
  db$ = this.key$.pipe(map(key => this.syncService.getListByKey<T>(key)));
  values$ = this.db$.pipe(switchMap(db => db.valueChanges()));

  constructor(
    protected readonly syncService: SyncService<any>,
    protected readonly key$: Observable<string>,
    protected readonly defaultValue?: T
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
}

@Injectable({
  providedIn: 'root'
})
export class SyncDataService {
  private readonly syncId$ = this.syncService.currentSyncId$.pipe(filter(a => !!a));

  constructor(private readonly syncService: SyncService<any>) {
  }

  getPresenterObject<T>(key: string, defaultValue?: T) {
    const key$ = this.syncId$.pipe(
      map((syncId) => `sync-sessions/${syncId}/presenter/${key}`)
    );

    return new SyncDataObject(this.syncService, key$, defaultValue);
  }

  getCurrentViewerObject<T>(key: string, defaultValue?: T) {
    const key$ = combineLatest([
      this.syncId$,
      this.syncService.currentViewerId$.pipe(filter(a => !!a))
    ]).pipe(
      map(([syncId, viewerId]) => {
        return `sync-sessions/${syncId}/viewer/${key}/${viewerId}`;
      })
    );

    return new SyncDataObject(this.syncService, key$, defaultValue);
  }

  getViewerObject<T>(key: string, viewerId: string, defaultValue?: T) {
    const key$ = this.syncId$.pipe(
      map((syncId) => `sync-sessions/${syncId}/viewer/${key}/${viewerId}`)
    );

    return new SyncDataObject(this.syncService, key$, defaultValue);
  }

  getCurrentViewerList<T>(key: string, defaultValue?: T) {
    const key$ = combineLatest([
      this.syncId$,
      this.syncService.currentViewerId$.pipe(filter(a => !!a))
    ]).pipe(
      map(([syncId, viewerId]) => `sync-sessions/${syncId}/viewer/${key}/${viewerId}`)
    );

    return new SyncDataList(this.syncService, key$, defaultValue);
  }

  getAdminAllUserData<T>(key: string, defaultValue?: T) {
    const key$ = this.syncId$.pipe(
      map((syncId) => `sync-sessions/${syncId}/viewer/${key}`)
    );

    return new SyncDataObject(this.syncService, key$, defaultValue);
  }
}
