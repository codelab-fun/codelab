import { TestBed } from '@angular/core/testing';

import { SyncCodeGameService } from './sync-code-game.service';

describe('SyncCodeGameService', () => {
  let service: SyncCodeGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncCodeGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
