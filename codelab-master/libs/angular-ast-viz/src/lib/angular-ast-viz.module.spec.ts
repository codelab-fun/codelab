import { async, TestBed } from '@angular/core/testing';
import { AngularAstVizModule } from './angular-ast-viz.module';

describe('AngularAstVizModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularAstVizModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AngularAstVizModule).toBeDefined();
  });
});
