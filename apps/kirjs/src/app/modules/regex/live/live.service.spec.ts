import { TestBed } from '@angular/core/testing';

import { LiveService } from './live.service';

describe('LiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveService = TestBed.get(LiveService);
    expect(service).toBeTruthy();
  });
});
