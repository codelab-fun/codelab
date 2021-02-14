import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncPollViewerChoiceComponent } from './sync-poll-viewer-choice.component';

describe('SyncPollViewerChoiceComponent', () => {
  let component: SyncPollViewerChoiceComponent;
  let fixture: ComponentFixture<SyncPollViewerChoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SyncPollViewerChoiceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPollViewerChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
