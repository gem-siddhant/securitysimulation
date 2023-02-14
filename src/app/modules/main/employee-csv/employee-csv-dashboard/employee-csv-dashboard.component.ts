import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';

export interface EmployeeCsv {
  id: Number;
  name: String;
  emailId: String;
  employeeId: String;
  manager: String;
  department: String;
}
@Component({
  selector: 'app-employee-csv-dashboard',
  templateUrl: './employee-csv-dashboard.component.html',
  styleUrls: ['./employee-csv-dashboard.component.css'],
})
export class EmployeeCsvDashboardComponent implements OnInit {
  dummyData: EmployeeCsv[] = [
    {
      id: 0,
      name: 'Rajesh kumar',
      emailId: 'rajesh@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      id: 1,
      name: 'Swati Verma',
      emailId: 'swati@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      id: 2,
      name: 'Pankaj Sharma',
      emailId: 'pankaj@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      id: 3,
      name: 'Kapil kapoor',
      emailId: 'kapil@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      id: 4,
      name: 'Yogesh kumar',
      emailId: 'yogesh@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      id: 5,
      name: 'Abhinav Mishra',
      emailId: 'abhinav@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      id: 6,
      name: 'Priyanka Bhadwaj',
      emailId: 'priyanka@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
  ];
  displayColumns: String[];
  employeeCsvTable: MatTableDataSource<EmployeeCsv>;
  employeeCsvForm: FormGroup;
  constructor(private commonService: CommonService, private formBuilder : FormBuilder) {
    this.displayColumns = [
      "name",
      'emailId',
      'employeeId',
      'manager',
      'department',
      'action',
    ];
    this.employeeCsvForm = this.formBuilder.group({});
    this.employeeCsvTable = new MatTableDataSource<EmployeeCsv>(this.dummyData);
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.employeeCsvForm = this.formBuilder.group({
      searchText : [''],
      filterType : [[]]
    });
  }
  applyFilter(){
    
  }
}
