import { TestBed, waitForAsync } from '@angular/core/testing';
import { SlidesModule } from './slides.module';

describe('SlidesModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SlidesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SlidesModule).toBeDefined();
  });
});
