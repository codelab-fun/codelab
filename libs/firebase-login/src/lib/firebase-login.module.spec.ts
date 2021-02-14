import { TestBed, waitForAsync } from '@angular/core/testing';
import { FirebaseLoginModule } from './firebase-login.module';

describe('FirebaseLoginModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseLoginModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FirebaseLoginModule).toBeDefined();
  });
});
