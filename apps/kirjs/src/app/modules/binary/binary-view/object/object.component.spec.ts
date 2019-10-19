import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectComponent } from './object.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ObjectComponent', () => {
  let component: ObjectComponent;
  let fixture: ComponentFixture<ObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectComponent);
    component = fixture.debugElement.componentInstance;
    component.data = { value: ['mock_value'] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
