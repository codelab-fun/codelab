import { TestBed } from '@angular/core/testing';

import { SyncPollService } from './sync-poll.service';

describe('SyncPollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncPollService = TestBed.get(SyncPollService);
    expect(service).toBeTruthy();
  });
});
