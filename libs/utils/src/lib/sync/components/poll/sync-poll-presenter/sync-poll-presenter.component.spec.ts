import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncPollPresenterComponent } from './sync-poll-presenter.component';

describe('SyncPollPresenterComponent', () => {
  let component: SyncPollPresenterComponent;
  let fixture: ComponentFixture<SyncPollPresenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SyncPollPresenterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPollPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
