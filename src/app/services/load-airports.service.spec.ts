import { TestBed } from '@angular/core/testing';

import { LoadAirportsService } from './load-airports.service';

describe('LoadAirportsService', () => {
  let service: LoadAirportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadAirportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
