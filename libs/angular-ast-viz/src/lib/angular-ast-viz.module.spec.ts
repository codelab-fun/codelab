import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularAstVizModule } from './angular-ast-viz.module';

describe('AngularAstVizModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AngularAstVizModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AngularAstVizModule).toBeDefined();
  });
});
