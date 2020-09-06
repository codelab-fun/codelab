import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncSessionsComponent } from './sync-sessions.component';

describe('SyncSessionsComponent', () => {
  let component: SyncSessionsComponent;
  let fixture: ComponentFixture<SyncSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SyncSessionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
