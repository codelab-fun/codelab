import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { SyncStatus } from '@codelab/utils/src/lib/sync/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly user$ = this.auth.user;
  readonly uid$ = this.user$.pipe(map(user => user && user.uid));
  readonly preferredStatus$ = new BehaviorSubject(SyncStatus.ADMIN)

  constructor(private auth: AngularFireAuth) {}
}
