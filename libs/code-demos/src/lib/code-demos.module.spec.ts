import { TestBed, waitForAsync } from '@angular/core/testing';
import { CodeDemoModule } from './code-demo.module';

describe('CodeDemoModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CodeDemoModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CodeDemoModule).toBeDefined();
  });
});
