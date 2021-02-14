import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularSlidesToPdfModule } from './angular-slides-to-pdf.module';

describe('AngularSlidesToPdfModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AngularSlidesToPdfModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AngularSlidesToPdfModule).toBeDefined();
  });
});
