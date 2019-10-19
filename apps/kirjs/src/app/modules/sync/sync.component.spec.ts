import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncComponent } from './sync.component';
import { SyncPlaygroundComponent } from '@codelab/utils/src/lib/sync/sync-playground/sync-playground.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SyncComponent', () => {
  let component: SyncComponent;
  let fixture: ComponentFixture<SyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SyncComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
