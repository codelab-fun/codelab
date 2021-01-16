import { of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

export const MockAngularFireDatabase = {
  list: jasmine.createSpy('list').and.returnValue({
    snapshotChanges: () => of([]),
    valueChanges: () => of([])
  }),
  object: jasmine.createSpy('object').and.returnValue(
    of({
      snapshotChanges: () => of({}),
      valueChanges: () => of({})
    })
  )
};

export const MockAngularFireAuth = {
  user: of({ isAnonymous: true, uid: 'lol' }),
  authState: of({})
};

export function getMockAngularFireProviders() {
  return [
    {
      provide: AngularFireDatabase,
      useValue: MockAngularFireDatabase
    },
    {
      provide: AngularFireAuth,
      useValue: MockAngularFireAuth
    }
  ];
}
