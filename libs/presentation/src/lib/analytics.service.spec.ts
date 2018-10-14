import { inject, TestBed } from '@angular/core/testing';

import { AnalyticsService } from './analytics.service';

// TODO(kirjs): Uncomment
xdescribe('AnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyticsService]
    });
  });

  it('should ...', inject([AnalyticsService], (service: AnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
