import { Injectable } from '@angular/core';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { AngularFireList, AngularFireObject } from '@angular/fire/database';

function mergeValues(value, defaultValue) {
  if (typeof value === 'object' && typeof defaultValue === 'object') {
    return {...defaultValue, ...value};
  }

  return typeof value === 'undefined' ? defaultValue : value;
}

export class SyncDataObject<T> {
  private readonly values$ = new BehaviorSubject(this.defaultValue);
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
    ).subscribe(value => this.set(value));
  }

  set(value: T) {
    return this.db$.pipe(first()).subscribe(db => {
      db.set(value);
    });
  }

  object(key: keyof T) {
    const key$ = this.key$.pipe(map(k => `${k}/${key}`));
    return this.syncDbService.object(key$, this.defaultValue ? this.defaultValue[key] : this.defaultValue);
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
}

@Injectable({
  providedIn: 'root'
})
export class SyncDataService {
  private readonly syncId$ = this.syncSesionService.sessionId$.pipe(filter(a => !!a));

  constructor(
    private readonly syncSesionService: SyncSessionService,
    private readonly dbService: SyncDbService) {
  }

  getPresenterObject<T>(key: string, defaultValue?: T) {
    const key$ = this.syncId$.pipe(
      map((syncId) => `sync-sessions/${syncId}/presenter/${key}`)
    );

    return this.dbService.object(key$, defaultValue);
  }

  getCurrentViewerObject<T>(key: string, defaultValue?: T) {
    const key$ = combineLatest([
      this.syncId$,
      this.syncSesionService.viewerId$.pipe(filter(a => !!a))
    ]).pipe(
      map(([syncId, viewerId]) => {
        return `sync-sessions/${syncId}/viewer/${key}/${viewerId}`;
      })
    );
    return this.dbService.object(key$, defaultValue);
  }

  getViewerObject<T>(key: string, viewerId: string, defaultValue?: T) {
    const key$ = this.syncId$.pipe(
      map((syncId) => `sync-sessions/${syncId}/viewer/${key}/${viewerId}`)
    );

    return this.dbService.object(key$, defaultValue);
  }

  getCurrentViewerList<T>(key: string, defaultValue?: T[]) {
    const key$ = combineLatest([
      this.syncId$,
      this.syncSesionService.viewerId$.pipe(filter(a => !!a))
    ]).pipe(
      map(([syncId, viewerId]) => `sync-sessions/${syncId}/viewer/${key}/${viewerId}`)
    );

    return this.dbService.list(key$, defaultValue);
  }

  getAdminAllUserData<T>(key: string, defaultValue?: T) {
    const key$ = this.syncId$.pipe(
      map((syncId) => `sync-sessions/${syncId}/viewer/${key}`)
    );

    return this.dbService.object(key$, defaultValue);
  }
}
