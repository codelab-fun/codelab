import { TestBed, waitForAsync } from '@angular/core/testing';
import { FirebaseModule } from './firebase.module';

describe('FirebaseModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FirebaseModule).toBeDefined();
  });
});
