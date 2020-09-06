import { async, TestBed } from '@angular/core/testing';
import { CodeDemoModule } from './code-demo.module';

describe('CodeDemoModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CodeDemoModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CodeDemoModule).toBeDefined();
  });
});
