import { inject, TestBed } from '@angular/core/testing';

import { CanActivateChildGuard } from './can-activate-child.guard';
import { getMockAngularFireProviders } from '@codelab/utils/src/lib/testing/mocks/angular-fire';

describe('CanActivateChildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateChildGuard, ...getMockAngularFireProviders()]
    });
  });

  it('should exist', inject([CanActivateChildGuard], (guard: CanActivateChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
