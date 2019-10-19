import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebassemblyCodeModeComponent } from './webassembly-code-mode.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WebassemblyCodeModeComponent', () => {
  let component: WebassemblyCodeModeComponent;
  let fixture: ComponentFixture<WebassemblyCodeModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebassemblyCodeModeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebassemblyCodeModeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
