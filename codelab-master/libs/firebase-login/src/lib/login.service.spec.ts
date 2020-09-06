import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

describe('LoginService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth,
          useValue: { user: of({}) }
        }
      ]
    })
  );

  it('should be created', () => {
    const service: LoginService = TestBed.inject(LoginService);
    expect(service).toBeTruthy();
  });
});
