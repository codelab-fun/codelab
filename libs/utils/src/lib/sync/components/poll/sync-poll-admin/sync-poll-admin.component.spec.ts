import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncPollAdminComponent } from './sync-poll-admin.component';

describe('SyncPollAdminComponent', () => {
  let component: SyncPollAdminComponent;
  let fixture: ComponentFixture<SyncPollAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SyncPollAdminComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPollAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
