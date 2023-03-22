import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { iconconst } from 'src/app/shared/Constants/constants';
import { EmpDashboardService } from '../../dashboard-services/emp-dashboard.service';


@Component({
  selector: 'app-dashboard-emp',
  templateUrl: './dashboard-emp.component.html',
  styleUrls: ['./dashboard-emp.component.css']
})
export class DashboardEmpComponent implements OnInit {
  campaigns: any = [];
  mode: ProgressSpinnerMode = 'determinate';
  color:any;
  bufferValue = 75;
  value = 100;
  totalcampcount: number = 0;
  phishedcount: number = 0;
  score : number = 0;
  campcompleted: number = 0;
  dataSource: any;
  displayedColumns : string[] = ['name','date','time','status']
  phishedanalytics: number = 0;
  campcompletedanalytics: number = 0;
  scoreanalytics: number = 0;
  select_val:any='';
  errormsg: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private commonService : CommonService,
    private _dashboardapi: EmpDashboardService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.gettotalCampaigns()
    this.gettotalCampaignsCompleted()
    this.gettotalCampaignsPhished()
    this.getTableData()
  }
  gettotalCampaigns(){
    let req={
      'email': localStorage.getItem('email')
    }
    this._dashboardapi.getTotalCampaigns(req).subscribe((data)=>{
      if(data){
        this.totalcampcount = data
      }
    },(err)=>
    {
      if(err.status!=200)
      {
      this.toastr.error("Error in loading data");
      }
    })
  }
  sortAndPaginate() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: any) {
    let  filterValue=event.target.value;
     filterValue = filterValue.trim(); // Remove whitespace
     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filterValue;

   }
   sortData(sort: MatSort) {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    }
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

  gettotalCampaignsCompleted(){
    let req={
      'email': localStorage.getItem('email')
    }
    this._dashboardapi.getTotalCompleted(req).subscribe((data)=>{
      if(data){
        this.campcompleted = data
      }
    },(err)=>
    {
      if(err.status!=200)
      {
      this.toastr.error("Error in loading data");
      }
    })
  }

  gettotalCampaignsPhished(){
    let req={
      'email': localStorage.getItem('email')
    }
    this._dashboardapi.getTotalPhished(req).subscribe((data)=>{
      if(data){
        this.phishedcount = data
      }
    },(err)=>
    {
      if(err.status!=200)
      {
      this.toastr.error("Error in loading data");
      }
    })
  }

  getTableData()
  {
    let req={
      'email': localStorage.getItem('email')
    }
    this._dashboardapi.getTableDetails(req).subscribe((data)=>
    {
      if(data)
      {
        this.campaigns=data;
        this.dataSource = new MatTableDataSource(data);
        this.sortAndPaginate()
        this.dataSource.sort = this.sort;
      }
    },(err)=>
    {
      if(err.status!=200)
      {
        this.toastr.error("No records found", undefined,
        {
          positionClass : 'toast-top-center'
        })
      }
    })
  }

}
