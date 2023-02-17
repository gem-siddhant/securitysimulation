import { TestBed } from '@angular/core/testing';

import { DashboardapiService } from './dashboardapi.service';

describe('DashboardapiService', () => {
  let service: DashboardapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
