import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncPollPresenterComponent } from './sync-poll-presenter.component';

describe('SyncPollPresenterComponent', () => {
  let component: SyncPollPresenterComponent;
  let fixture: ComponentFixture<SyncPollPresenterComponent>;

  beforeEach(async(() => {
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
