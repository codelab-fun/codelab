import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HexdecComponent } from './hexdec.component';

describe('HexdecComponent', () => {
  let component: HexdecComponent;
  let fixture: ComponentFixture<HexdecComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HexdecComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexdecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
