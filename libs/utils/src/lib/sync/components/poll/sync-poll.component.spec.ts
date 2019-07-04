import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncPollComponent } from './sync-poll.component';

describe('SyncPollComponent', () => {
  let component: SyncPollComponent;
  let fixture: ComponentFixture<SyncPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncPollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
