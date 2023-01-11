import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseDb } from './common';
import { SyncDbService } from './sync-db.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseInfoService {
  readonly online$ = this.syncDb
    .object('.info')
    .object('connected')
    .valueChanges();

  readonly offset$: Observable<number> = this.syncDb
    .object('.info')
    .object('serverTimeOffset')
    .valueChanges()
    .pipe(map((a) => Number(a)));

  constructor(private readonly syncDb: SyncDbService<FirebaseDb>) {}
}
