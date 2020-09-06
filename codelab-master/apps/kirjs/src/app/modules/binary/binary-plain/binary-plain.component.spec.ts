import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryPlainComponent } from './binary-plain.component';

describe('BinaryPlainComponent', () => {
  let component: BinaryPlainComponent;
  let fixture: ComponentFixture<BinaryPlainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryPlainComponent]
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
