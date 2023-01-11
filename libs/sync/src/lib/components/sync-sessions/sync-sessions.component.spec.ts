import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncSessionsComponent } from './sync-sessions.component';

describe('SyncSessionsComponent', () => {
  let component: SyncSessionsComponent;
  let fixture: ComponentFixture<SyncSessionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SyncSessionsComponent],
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
