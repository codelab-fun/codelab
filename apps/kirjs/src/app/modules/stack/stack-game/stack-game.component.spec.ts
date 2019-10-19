import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackGameComponent } from './stack-game.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StackGameComponent', () => {
  let component: StackGameComponent;
  let fixture: ComponentFixture<StackGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackGameComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackGameComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
