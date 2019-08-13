import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { SyncDataList, SyncDataObject } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SyncDbService {
  readonly online$ = this.object(of('.info/connected')).valueChanges();

  constructor(private db: AngularFireDatabase) {
  }

  object<T>(key$: Observable<string>, defaultValue: T = null) {
    const db$ = key$.pipe(
      filter(k => !!k),
      map(key => this.db.object<T>(key)
      ));
    return new SyncDataObject<T>(db$, key$, this, defaultValue);
  }

  list<T>(key$: Observable<string>, defaultValue: T[] = []) {
    const db$ = key$.pipe(map(key => this.db.list<T>(key)));
    return new SyncDataList<T>(db$, key$, this, defaultValue);
  }
}
