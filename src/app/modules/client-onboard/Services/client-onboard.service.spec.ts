import { TestBed } from '@angular/core/testing';

import { ClientOnboardService } from './client-onboard.service';

describe('ClientOnboardService', () => {
  let service: ClientOnboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientOnboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
