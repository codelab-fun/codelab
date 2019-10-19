import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryPlainComponent } from './binary-plain.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/compiler/src/core';

describe('BinaryPlainComponent', () => {
  let component: BinaryPlainComponent;
  let fixture: ComponentFixture<BinaryPlainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryPlainComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryPlainComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
