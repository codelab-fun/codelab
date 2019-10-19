import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeGifComponent } from './fake-gif.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('FakeGifComponent', () => {
  let component: FakeGifComponent;
  let fixture: ComponentFixture<FakeGifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FakeGifComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeGifComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
