import { async, TestBed } from '@angular/core/testing';
import { FirebaseModule } from './firebase.module';

describe('FirebaseModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FirebaseModule).toBeDefined();
  });
});
