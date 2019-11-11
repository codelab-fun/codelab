import { TestBed } from '@angular/core/testing';

import { FullScreenModeService } from './full-screen-mode.service';

describe('FullScreenModeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullScreenModeService = TestBed.inject(
      FullScreenModeService
    );
    expect(service).toBeTruthy();
  });
});
