import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateChildGuard } from './can-activate-child.guard';

describe('CanActivateChildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateChildGuard]
    });
  });

  it('should ...', inject([CanActivateChildGuard], (guard: CanActivateChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
