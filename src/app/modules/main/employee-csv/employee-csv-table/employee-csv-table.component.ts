import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeCsv } from '../employee-client.model';
import { EmployeeCsvService } from '../services/employee-csv.service';

@Component({
  selector: 'app-employee-csv-table',
  templateUrl: './employee-csv-table.component.html',
  styleUrls: ['./employee-csv-table.component.css']
})
export class EmployeeCsvTableComponent implements OnInit {

  employeeCsvTable: MatTableDataSource<EmployeeCsv>;
  displayColumns: string[];
  @Input() searchText : string;
  @Input() filterType : string;
  @Input() tableData : EmployeeCsv[];

  constructor(private router: Router, private employeeCsvService : EmployeeCsvService) {
    this.displayColumns = [
      "name",
      'email',
      'employeeId',
      'manager',
      'department',
      'action',
    ];
    this.employeeCsvTable = new MatTableDataSource<EmployeeCsv>();
   }

  ngOnInit(): void {
  }
  ngOnChanges(){
    console.log(this.searchText, this.filterType);
    this.employeeCsvTable = new MatTableDataSource<EmployeeCsv>(this.tableData);
  }
  navigateToClientDetails(userId : number){
    this.router.navigate(['/main/employee-csv/client-details',userId]);
  }
}
