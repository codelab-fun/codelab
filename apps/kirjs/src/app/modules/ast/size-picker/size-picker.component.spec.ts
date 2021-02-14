import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SizePickerComponent } from './size-picker.component';

describe('SizePickerComponent', () => {
  let component: SizePickerComponent;
  let fixture: ComponentFixture<SizePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SizePickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
