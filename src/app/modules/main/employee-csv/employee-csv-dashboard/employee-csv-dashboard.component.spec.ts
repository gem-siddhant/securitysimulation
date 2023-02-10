import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCsvDashboardComponent } from './employee-csv-dashboard.component';

describe('EmployeeCsvDashboardComponent', () => {
  let component: EmployeeCsvDashboardComponent;
  let fixture: ComponentFixture<EmployeeCsvDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCsvDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCsvDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
