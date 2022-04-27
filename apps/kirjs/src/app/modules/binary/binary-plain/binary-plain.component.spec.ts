import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BinaryPlainComponent } from './binary-plain.component';

describe('BinaryPlainComponent', () => {
  let component: BinaryPlainComponent;
  let fixture: ComponentFixture<BinaryPlainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryPlainComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryPlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
