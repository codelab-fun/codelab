import { TestBed } from '@angular/core/testing';

import { SyncDbService } from './sync-db.service';

describe('SyncDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncDbService = TestBed.get(SyncDbService);
    expect(service).toBeTruthy();
  });
});
