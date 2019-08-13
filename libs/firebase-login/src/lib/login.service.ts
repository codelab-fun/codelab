import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { SyncStatus } from '@codelab/utils/src/lib/sync/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly user$ = this.auth.user;
  readonly uid$ = this.user$.pipe(map(user => user && user.uid));
  readonly preferredStatus$ = new BehaviorSubject(SyncStatus.ADMIN);

  constructor(private auth: AngularFireAuth) {
    this.user$.pipe(first()).subscribe(a => {
      if (!a) {
        this.anonymousLogin();
      }
    });
  }

  anonymousLogin() {
    return this.auth.auth.signInAnonymously()
      .then(() => console.log('successful login'))
      .catch(error => console.log(error));
  }
}
