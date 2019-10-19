import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackFunctionButtonComponent } from './stack-function-button.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('StackFunctionButtonComponent', () => {
  let component: StackFunctionButtonComponent;
  let fixture: ComponentFixture<StackFunctionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackFunctionButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackFunctionButtonComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
