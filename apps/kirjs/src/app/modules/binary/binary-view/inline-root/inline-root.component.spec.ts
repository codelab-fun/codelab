import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineRootComponent } from './inline-root.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InlineRootComponent', () => {
  let component: InlineRootComponent;
  let fixture: ComponentFixture<InlineRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InlineRootComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineRootComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
