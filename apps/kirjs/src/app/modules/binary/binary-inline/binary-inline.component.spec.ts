import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryInlineComponent } from './binary-inline.component';
import { BinaryParser } from '../parser/binary-parser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('BinaryInlineComponent', () => {
  let component: BinaryInlineComponent;
  let fixture: ComponentFixture<BinaryInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryInlineComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryInlineComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
