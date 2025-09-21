import { TestBed } from '@angular/core/testing';

import { MusicAnalyticsService } from './music-analytics.service';

describe('MusicAnalyticsService', () => {
  let service: MusicAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
