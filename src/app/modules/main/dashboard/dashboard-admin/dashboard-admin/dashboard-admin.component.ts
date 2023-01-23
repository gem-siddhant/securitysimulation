import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../../service/main.service';
import {view_data} from './dashboard-view';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { colorconst} from 'src/app/shared/Constants/constants'
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  campaigns:any=[];
  campaigns2:any=[];
  sentcount: number = 0;
  endedcount: number=0;
  killedcount: number=0;
  totalcampaigncount: number =0;
  dataSource: any;
  dataSource2: any;
  isShow = true;
  displayedColumns: string[] = ['name','opened','delivered','notDelivered','created_on','taskStatus'];
  mode: ProgressSpinnerMode = 'determinate';
  color:any;
  bufferValue = 75;
  value = 100;
  clickcount = 0
  sendanalytics: number = 0
  killedanalytics: number= 0;
  endedanalytics: number= 0;
  constructor(private _main:MainService,
    private router:Router,
    private toastr:ToastrService) { }
  
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  ngOnInit(): void {
    this.getAllCampaigns();
    this.viewmore();
    this.dataSource = new MatTableDataSource<view_data>([]);
    this.color = colorconst.sendanalyticscolor
  }
  getAllCampaigns(){
    this._main.getAllCampaigns(localStorage.getItem('email')).subscribe((data)=>{
      if(data){
        this.campaigns=data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource = this.dataSource.filteredData
        console.log(this.dataSource)
        for(let ele of this.campaigns)
        {
          if(ele.taskStatus=='SENT' || ele.taskStatus=='FAILED' || ele.taskStatus=='IN PROGRESS' || ele.taskStatus=='ENDED')
          {
            this.totalcampaigncount++
          }
          if(ele.taskStatus=='KILLED')
          {
            this.killedcount++
          }
          if(ele.taskStatus=='ENDED')
          {
            this.endedcount++
          }
          if(ele.taskStatus=='SENT')
          {
            this.sentcount++
          }
        }

      }
    this.sendanalytics = Math.ceil((this.sentcount/this.totalcampaigncount)*100)
    this.killedanalytics = Math.ceil((this.killedcount/this.totalcampaigncount)*100)
    this.endedanalytics = Math.ceil((this.endedcount/this.totalcampaigncount)*100)
    },err=>{
      this.toastr.error("Error in loading data");
    })
    
  }

  viewmore()
  {
    this.isShow = !this.isShow
    this._main.viewmorecamp(localStorage.getItem('email')).subscribe((data)=>{
      if(data){
        this.campaigns2=data;
        this.dataSource2 = new MatTableDataSource(data);
        this.dataSource2 = this.dataSource2.filteredData
        if(this.clickcount==0)
        {
        for(let ele of this.campaigns2)
        {
          if(ele.taskStatus=='SENT' || ele.taskStatus=='FAILED' || ele.taskStatus=='IN PROGRESS' || ele.taskStatus=='ENDED')
          {
            this.totalcampaigncount++
          }
          if(ele.taskStatus=='KILLED')
          {
            this.killedcount++
          }
          if(ele.taskStatus=='ENDED')
          {
            this.endedcount++
          }
          if(ele.taskStatus=='SENT')
          {
            this.sentcount++
          }
        }
      }
    }
    this.sendanalytics = Math.ceil((this.sentcount/this.totalcampaigncount)*100)
    this.killedanalytics = Math.ceil((this.killedcount/this.totalcampaigncount)*100)
    this.endedanalytics = Math.ceil((this.endedcount/this.totalcampaigncount)*100)
    },
      err=>{
        this.toastr.error("Error in loading data");
      })
     
    }
}
