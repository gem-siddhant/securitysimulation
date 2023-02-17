import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCsvTableComponent } from './employee-csv-table.component';

describe('EmployeeCsvTableComponent', () => {
  let component: EmployeeCsvTableComponent;
  let fixture: ComponentFixture<EmployeeCsvTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCsvTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCsvTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
