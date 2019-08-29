import { TestBed } from '@angular/core/testing';

import { SyncSessionService } from './sync-session.service';

describe('SyncSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncSessionService = TestBed.get(SyncSessionService);
    expect(service).toBeTruthy();
  });
});
