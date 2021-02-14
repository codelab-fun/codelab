import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BinaryDisplayComponent } from './binary-display.component';

describe('BinaryDisplayComponent', () => {
  let component: BinaryDisplayComponent;
  let fixture: ComponentFixture<BinaryDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryDisplayComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
