import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryParserDemoComponent } from './binary-parser-demo.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('BinaryParserDemoComponent', () => {
  let component: BinaryParserDemoComponent;
  let fixture: ComponentFixture<BinaryParserDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryParserDemoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryParserDemoComponent);
    component = fixture.debugElement.componentInstance;
    component.helpers = [{ value: 'mock' }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
