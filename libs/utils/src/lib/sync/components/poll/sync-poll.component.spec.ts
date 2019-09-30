import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncPollComponent } from './sync-poll.component';
import { SyncPollModule } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.module';

describe('SyncPollComponent', () => {
  let component: SyncPollComponent;
  let fixture: ComponentFixture<SyncPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SyncPollModule]
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
