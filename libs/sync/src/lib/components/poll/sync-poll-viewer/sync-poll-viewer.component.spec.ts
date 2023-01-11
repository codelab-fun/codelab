import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncPollViewerComponent } from './sync-poll-viewer.component';

describe('SyncPollViewerComponent', () => {
  let component: SyncPollViewerComponent;
  let fixture: ComponentFixture<SyncPollViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SyncPollViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPollViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
