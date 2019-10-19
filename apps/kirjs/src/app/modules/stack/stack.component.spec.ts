import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackComponent } from './stack.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StackComponent', () => {
  let component: StackComponent;
  let fixture: ComponentFixture<StackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
