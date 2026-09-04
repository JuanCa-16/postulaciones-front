import { TestBed } from '@angular/core/testing';

import { BgStatusService } from './bg-status-service';

describe('BgStatusService', () => {
  let service: BgStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BgStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
