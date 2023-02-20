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
      name: 'Rajesh kumar',
      email: 'rajesh@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      name: 'Swati Verma',
      email: 'swati@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      name: 'Pankaj Sharma',
      email: 'pankaj@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      name: 'Kapil kapoor',
      email: 'kapil@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      name: 'Yogesh kumar',
      email: 'yogesh@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      name: 'Abhinav Mishra',
      email: 'abhinav@tcs.com',
      employeeId: 'GSI-123',
      manager: 'Manaher Singh',
      department: 'IT',
    },
    {
      name: 'Priyanka Bhadwaj',
      email: 'priyanka@tcs.com',
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
      'email',
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
