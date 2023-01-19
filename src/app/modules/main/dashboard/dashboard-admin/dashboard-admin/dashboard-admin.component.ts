import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../../service/main.service';
import {view_data} from './dashboard-view';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['name','opened','delivered','notDelivered','created_on','taskStatus'];
  constructor(private _main:MainService,
    private router:Router,
    private toastr:ToastrService) { }
    
  ngOnInit(): void {
    this.getAllCampaigns();
    this.viewmore();
    this.dataSource = new MatTableDataSource<view_data>([]);
  }
  getAllCampaigns(){
    this._main.getAllCampaigns(localStorage.getItem('email')).subscribe((data)=>{
      if(data){
        this.campaigns=data;
        this.dataSource = new MatTableDataSource<view_data>(data);
        this.dataSource = this.dataSource.filteredData
        console.log(this.dataSource)
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
    },err=>{
      this.toastr.error("Error in loading data");
    })
    
  }

  viewmore()
  {
    this._main.viewmorecamp(localStorage.getItem('email')).subscribe((data)=>{
      if(data){
        this.campaigns2=data;
        this.dataSource = new MatTableDataSource<view_data>(data);
        this.dataSource = this.dataSource.filteredData
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
    },
      err=>{
        this.toastr.error("Error in loading data");
      })
     
    }
}
