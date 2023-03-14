import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { CourseDetails, SimulationDetails } from '../employee-client.model';

@Component({
  selector: 'app-client-simulation-table',
  templateUrl: './client-simulation-table.component.html',
  styleUrls: ['./client-simulation-table.component.css']
})
export class ClientSimulationTableComponent implements OnInit {

  displayColumns: string[];
  courseSimulationTable: MatTableDataSource<CourseDetails | SimulationDetails>;
  @Input() searchText : string;
  @Input() filterType : string;
  @Input() tableData : (CourseDetails | SimulationDetails)[];
  @Input() isCourseTabOpened : boolean
  pageEvent: PageEvent;
  tablePageIndex : number;
  noOfRows: number;
  tableLength : number;
  constructor() {
    this.displayColumns = [
      "name",
      'time',
      "date",
      'assignedDate',
      'completionDate',
      'courseScore',
      'status',
    ];
    this.courseSimulationTable = new MatTableDataSource<CourseDetails | SimulationDetails>();
    this.pageEvent = new PageEvent();
    this.tablePageIndex = 0;
    this.noOfRows = 5;
    this.tableLength = 0;
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.tableLength = this.tableData ? this.filteredTable().length : 0;
    this.getData();
  }

  ngAfterViewChecked(): void {
    if (this.courseSimulationTable.data.length != 0) {
      const list = document.getElementsByClassName("mat-paginator-range-label");
      this.tableLength > 0
        ? (list[0].innerHTML =
            "Page: " +
            (this.tablePageIndex + 1).toString() +
            " of " +
            Math.ceil(this.tableLength / this.noOfRows))
        : (list[0].innerHTML = "Page: 0 of 0");
    }
  }

  getModifiedDate(val : string) : string{
    if(val){
      return moment(val).format('DD-MM-YYYY');
    }
    return '-';
  }

  paginationData(){
    let startIndex = this.tablePageIndex*this.noOfRows;
    let endIndex = (this.tablePageIndex + 1) * this.noOfRows;
    let paginatedTable = new Array<CourseDetails | SimulationDetails>();
    for(let i=startIndex; i< this.tableLength && i<endIndex;i++){
      paginatedTable.push(this.filteredTable()[i]);
    }
    this.courseSimulationTable = new MatTableDataSource<CourseDetails | SimulationDetails>(paginatedTable);

  }

  getData(event?: PageEvent): PageEvent {
    if (event) {
      this.noOfRows = event.pageSize;
      this.tablePageIndex = event.pageIndex;
    }
    this.paginationData();
    if (event) {
      return event;
    }
    return new PageEvent();
  }

  filteredTable() : (CourseDetails | SimulationDetails)[] {
    let csvTableData = this.tableData.filter((data) => {
      if (this.filterType === 'name') {
        return data.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      } else if (this.filterType === 'status') {
        return data.status.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      }
      return (
        data.name?.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 ||
        data.status?.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
      );
    });
    return csvTableData;
  }
  
}
