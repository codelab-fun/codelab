import { async, TestBed } from '@angular/core/testing';
import { SlidesModule } from './slides.module';

describe('SlidesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SlidesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SlidesModule).toBeDefined();
  });
});
