import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryInlineComponent } from './binary-inline.component';

describe('BinaryInlineComponent', () => {
  let component: BinaryInlineComponent;
  let fixture: ComponentFixture<BinaryInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryInlineComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
