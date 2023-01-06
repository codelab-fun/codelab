import { of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const MockAngularFireDatabase = {
  list: {
    snapshotChanges: () => of([]),
    valueChanges: () => of([]),
  },
  object: of({
    snapshotChanges: () => of({}),
    valueChanges: () => of({}),
  }),
};

export const MockAngularFireAuth = {
  user: of({ isAnonymous: true, uid: 'lol' }),
  authState: of({}),
};

export function getMockAngularFireProviders() {
  return [
    {
      provide: AngularFireDatabase,
      useValue: MockAngularFireDatabase,
    },
    {
      provide: AngularFireAuth,
      useValue: MockAngularFireAuth,
    },
  ];
}
