import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  @Input() tableData : CourseDetails[] | SimulationDetails[];
  @Input() isCourseTabOpened : boolean
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
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log(this.searchText, this.filterType);
    this.courseSimulationTable = new MatTableDataSource<CourseDetails | SimulationDetails>(this.tableData);
  }

}
