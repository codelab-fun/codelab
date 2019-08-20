import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SyncDataList, SyncDataObject } from '@codelab/utils/src/lib/sync/services/common';

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

