import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BinaryFlatComponent } from './binary-flat.component';

describe('BinaryFlatComponent', () => {
  let component: BinaryFlatComponent;
  let fixture: ComponentFixture<BinaryFlatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryFlatComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
