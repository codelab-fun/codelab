import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GithubAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly user$ = this.auth.user;
  readonly isAnonymous$ = this.auth.user.pipe(
    map((u) => (u ? u.isAnonymous : true))
  );
  readonly uid$: Observable<string> = this.user$.pipe(
    map((user) => user && user.uid)
  );

  constructor(private auth: AngularFireAuth) {
    this.user$.pipe(first()).subscribe((a) => {
      if (!a) {
        this.anonymousLogin();
      }
    });
  }

  anonymousLogin() {
    return this.auth
      .signInAnonymously()
      .then(() => console.log('successful login'))
      .catch((error) => console.log(error));
  }

  async logout() {
    await this.auth.signOut();
    this.anonymousLogin();
  }

  loginWithGithub() {
    this.auth.signInWithPopup(new GithubAuthProvider());
  }
}
