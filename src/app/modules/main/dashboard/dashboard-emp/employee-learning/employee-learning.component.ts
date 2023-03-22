import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { EmpDashboardService } from '../../dashboard-services/emp-dashboard.service';

@Component({
  selector: 'app-employee-learning',
  templateUrl: './employee-learning.component.html',
  styleUrls: ['./employee-learning.component.css']
})
export class EmployeeLearningComponent implements OnInit {
  campaigns: any = [];
  totalcourse: number = 0;
  coursecompleted: number = 0;
  courseleft : number = 0;
  coursescore: number = 0;
  dataSource: any;
  select_val:any='';
  displayedColumns : string[] = ['trainingDocument','assignedDate','completionDate','learningScore','status']
  errormsg: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private commonService : CommonService,
    private _empservice : EmpDashboardService,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.getCountDetails()
  }

  getCountDetails()
  {
    let req = {
      'email' : localStorage.getItem('email')
    }
    this._empservice.getLearningDetails(req).subscribe((data)=>
    {
      if(data)
      {
        this.campaigns = data
        this.totalcourse = this.campaigns.totalCourse
        this.coursecompleted =  this.campaigns.courseCompleted
        this.courseleft = this.campaigns.courseleft
        this.coursescore = this.campaigns.courseScore
        this.dataSource = this.campaigns.employeeAssignedLearnings
        if(this.dataSource.length==0)
        {
          this.errormsg = "no data"
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    },
      (    error: any) => {
      console.error(error);
    })
  }
  filterDrop(){
    this.errormsg = ''
    let filterValue=this.select_val;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
     if(this.dataSource.filteredData.length==0)
     {
      this.errormsg="no data found"
     }
  }
  applyFilter(event: any) {
    let  filterValue=event.target.value;
     filterValue = filterValue.trim(); // Remove whitespace
     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filterValue;

   }
}
