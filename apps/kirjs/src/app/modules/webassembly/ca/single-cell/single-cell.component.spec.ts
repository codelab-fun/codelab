import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleCellComponent } from './single-cell.component';

describe('SingleCellComponent', () => {
  let component: SingleCellComponent;
  let fixture: ComponentFixture<SingleCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
