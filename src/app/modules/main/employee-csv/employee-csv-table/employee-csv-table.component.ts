import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeCsv } from '../employee-client.model';

@Component({
  selector: 'app-employee-csv-table',
  templateUrl: './employee-csv-table.component.html',
  styleUrls: ['./employee-csv-table.component.css'],
})
export class EmployeeCsvTableComponent implements OnInit {
  employeeCsvTable: MatTableDataSource<EmployeeCsv>;
  displayColumns: string[];
  @Input() searchText: string;
  @Input() filterType: string;
  @Input() tableData: EmployeeCsv[];
  @Output() deleteEventEmitter : EventEmitter<number>;

  constructor(
    private router: Router,
  ) {
    this.displayColumns = [
      'name',
      'email',
      'employeeId',
      'manager',
      'department',
      'action',
    ];
    this.employeeCsvTable = new MatTableDataSource<EmployeeCsv>();
    this.deleteEventEmitter = new EventEmitter<number>();
  }

  ngOnInit(): void {}
  ngOnChanges() {
    this.employeeCsvTable = new MatTableDataSource<EmployeeCsv>(this.filteredTable());
  }
  navigateToClientDetails(userId: number) {
    this.router.navigate(['/main/employee-csv/client-details', userId]);
  }
  filteredTable() : EmployeeCsv[] {
    let csvTableData = this.tableData.filter((data) => {
      if (this.filterType === 'empName') {
        return data.name.indexOf(this.searchText) > -1;
      } else if (this.filterType === 'empId') {
        return data.employeeId.indexOf(this.searchText) > -1;
      } else if (this.filterType === 'emailId') {
        return data.email.indexOf(this.searchText) > -1;
      }
      return (
        data.name.indexOf(this.searchText) > -1 ||
        data.employeeId.indexOf(this.searchText) > -1 ||
        data.email.indexOf(this.searchText) > -1
      );
    });
    return csvTableData;
  }

  deleteEmployee(userId : number) : void{
    this.deleteEventEmitter.emit(userId);
  }
}
