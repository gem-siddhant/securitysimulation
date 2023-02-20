import { TestBed } from '@angular/core/testing';

import { EmployeeCsvService } from './employee-csv.service';

describe('EmployeeCsvService', () => {
  let service: EmployeeCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
