import { TestBed } from '@angular/core/testing';

import { OnboardapiserviceService } from './onboardapiservice.service';

describe('OnboardapiserviceService', () => {
  let service: OnboardapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
