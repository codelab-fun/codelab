import { TestBed, waitForAsync } from '@angular/core/testing';
import { SlidesModule } from './slides.module';

describe('SlidesModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SlidesModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SlidesModule).toBeDefined();
  });
});
