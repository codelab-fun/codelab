import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryComponent } from './memory.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('MemoryComponent', () => {
  let component: MemoryComponent;
  let fixture: ComponentFixture<MemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemoryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
