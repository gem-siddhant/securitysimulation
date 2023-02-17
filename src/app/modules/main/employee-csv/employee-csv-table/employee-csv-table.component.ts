import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeCsv } from '../employee-client.model';

@Component({
  selector: 'app-employee-csv-table',
  templateUrl: './employee-csv-table.component.html',
  styleUrls: ['./employee-csv-table.component.css']
})
export class EmployeeCsvTableComponent implements OnInit {

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
  employeeCsvTable: MatTableDataSource<EmployeeCsv>;
  displayColumns: string[];
  @Input() searchText : string;
  @Input() filterType : string;
  constructor(private router: Router) {
    this.displayColumns = [
      "name",
      'emailId',
      'employeeId',
      'manager',
      'department',
      'action',
    ];
    this.employeeCsvTable = new MatTableDataSource<EmployeeCsv>(this.dummyData);
   }

  ngOnInit(): void {
  }
  ngOnChanges(){
    console.log(this.searchText, this.filterType);
  }
  navigateToClientDetails(id : number){
    this.router.navigate(['/main/employee-csv/client-details',id]);
  }
}
