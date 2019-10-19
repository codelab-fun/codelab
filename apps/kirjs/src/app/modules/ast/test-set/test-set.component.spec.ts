import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetComponent } from './test-set.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('TestSetComponent', () => {
  let component: TestSetComponent;
  let fixture: ComponentFixture<TestSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestSetComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetComponent);
    component = fixture.debugElement.componentInstance;
    component.files = [{ code: 'file_code_123' }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
