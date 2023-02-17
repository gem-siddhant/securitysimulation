import { TestBed } from '@angular/core/testing';

import { EmponboardapiService } from './emponboardapi.service';

describe('EmponboardapiService', () => {
  let service: EmponboardapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmponboardapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
