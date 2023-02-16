import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { iconconst } from 'src/app/shared/Constants/constants';
import { EmpDashboardService } from '../dashboard-services/emp-dashboard.service';


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
