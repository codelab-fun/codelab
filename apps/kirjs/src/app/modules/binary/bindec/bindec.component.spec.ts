import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindecComponent } from './bindec.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/compiler/src/core';

describe('BindecComponent', () => {
  let component: BindecComponent;
  let fixture: ComponentFixture<BindecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BindecComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindecComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
