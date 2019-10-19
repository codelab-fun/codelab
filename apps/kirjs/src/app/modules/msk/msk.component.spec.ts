import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MskComponent } from './msk.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('MskComponent', () => {
  let component: MskComponent;
  let fixture: ComponentFixture<MskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MskComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
