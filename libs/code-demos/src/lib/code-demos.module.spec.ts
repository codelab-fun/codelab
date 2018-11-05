import { async, TestBed } from '@angular/core/testing';
import { CodeDemosModule } from './code-demos.module';

describe('CodeDemosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CodeDemosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CodeDemosModule).toBeDefined();
  });
});
