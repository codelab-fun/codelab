import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncPollComponent } from './sync-poll.component';
import { SyncPollModule } from "./sync-poll.module";

describe('SyncPollComponent', () => {
  let component: SyncPollComponent;
  let fixture: ComponentFixture<SyncPollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SyncPollModule],
    }).compileComponents();
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
