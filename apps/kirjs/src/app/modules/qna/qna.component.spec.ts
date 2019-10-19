import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaComponent } from './qna.component';
import { SyncPlaygroundComponent } from '@codelab/utils/src/lib/sync/sync-playground/sync-playground.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('QnaComponent', () => {
  let component: QnaComponent;
  let fixture: ComponentFixture<QnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QnaComponent],
      providers: [SyncPlaygroundComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnaComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
