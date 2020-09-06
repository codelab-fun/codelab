import { async, TestBed } from '@angular/core/testing';
import { FeedbackModule } from './feedback.module';

describe('FeedbackModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeedbackModule).toBeDefined();
  });
});
