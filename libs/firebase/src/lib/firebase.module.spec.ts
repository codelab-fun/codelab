import { TestBed, waitForAsync } from '@angular/core/testing';
import { FirebaseModule } from './firebase.module';

describe('FirebaseModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FirebaseModule).toBeDefined();
  });
});
