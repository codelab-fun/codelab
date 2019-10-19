import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayComponent } from './array.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('ArrayComponent', () => {
  let component: ArrayComponent;
  let fixture: ComponentFixture<ArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArrayComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayComponent);
    component = fixture.debugElement.componentInstance;
    component.data = {
      index: 1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
