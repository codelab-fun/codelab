import { TestBed } from '@angular/core/testing';

import { TestRunnerService } from './test-runner.service';

describe('TestRunnerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestRunnerService = TestBed.inject(TestRunnerService);
    expect(service).toBeTruthy();
  });
});
