import { async, TestBed } from '@angular/core/testing';
import { TooltipsModule } from './tooltips.module';

describe('TooltipsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TooltipsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TooltipsModule).toBeDefined();
  });
});
