import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleGridComponent } from './single-grid.component';

describe('SingleGridComponent', () => {
  let component: SingleGridComponent;
  let fixture: ComponentFixture<SingleGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SingleGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
