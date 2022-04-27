import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NumberComponent } from './number.component';

describe('NumberComponent', () => {
  let component: NumberComponent;
  let fixture: ComponentFixture<NumberComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NumberComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
