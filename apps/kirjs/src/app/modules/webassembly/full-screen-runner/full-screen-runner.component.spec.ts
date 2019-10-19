import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenRunnerComponent } from './full-screen-runner.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/compiler/src/core';

describe('FullScreenRunnerComponent', () => {
  let component: FullScreenRunnerComponent;
  let fixture: ComponentFixture<FullScreenRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullScreenRunnerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenRunnerComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
