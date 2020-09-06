import { async, TestBed } from '@angular/core/testing';
import { AngularSlidesToPdfModule } from './angular-slides-to-pdf.module';

describe('AngularSlidesToPdfModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularSlidesToPdfModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AngularSlidesToPdfModule).toBeDefined();
  });
});
