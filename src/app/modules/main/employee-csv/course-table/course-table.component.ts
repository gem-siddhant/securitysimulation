import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CourseDetails } from '../employee-client.model';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {

  dummyData: CourseDetails[] = [
    {
      id: 0,
      courseName: 'Java',
      courseTime: '4:00',
      assignedDate: '01/02/2023',
      completionDate: '10/2/2023',
      courseScore: 123,
      status: 'Completed',
    },
    {
      id: 1,
      courseName: 'Python',
      courseTime: '2:05',
      assignedDate: '01/02/2023',
      completionDate: '10/2/2023',
      courseScore: 125,
      status: 'Not Started',
    },
    {
      id: 2,
      courseName: 'C++',
      courseTime: '12:34',
      assignedDate: '01/02/2023',
      completionDate: '10/2/2023',
      courseScore: 456,
      status: 'Not Started',
    },
    {
      id: 3,
      courseName: 'Git',
      courseTime: '21:01',
      assignedDate: '01/02/2023',
      completionDate: '10/2/2023',
      courseScore: 110,
      status: 'Completed',
    },

    {
      id: 4,
      courseName: 'AWS',
      courseTime: '19:42',
      assignedDate: '01/02/2023',
      completionDate: '10/2/2023',
      courseScore: 200,
      status: 'Completed',
    },

    {
      id: 5,
      courseName: 'Angular',
      courseTime: '17:53',
      assignedDate: '01/02/2023',
      completionDate: '10/2/2023',
      courseScore: 150,
      status: 'Not Started',
    },

    {
      id: 6,
      courseName: 'React',
      courseTime: '18:02',
      assignedDate: '01/02/2023',
      completionDate: '10/2/2023',
      courseScore: 250,
      status: 'Completed',
    },
  ];
  displayColumns: string[];
  courseTable: MatTableDataSource<CourseDetails>;
  @Input() searchText : string;
  @Input() filterType : string;
  constructor() {
    this.displayColumns = [
      "courseName",
      'courseTime',
      'assignedDate',
      'completionDate',
      'courseScore',
      'status',
    ];
    this.courseTable = new MatTableDataSource<CourseDetails>(this.dummyData);
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log(this.searchText, this.filterType);
  }

}
