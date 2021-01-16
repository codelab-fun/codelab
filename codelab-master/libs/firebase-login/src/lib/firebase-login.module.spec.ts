import { async, TestBed } from '@angular/core/testing';
import { FirebaseLoginModule } from './firebase-login.module';

describe('FirebaseLoginModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseLoginModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FirebaseLoginModule).toBeDefined();
  });
});
