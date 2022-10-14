import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { view_data } from '../campaign-view/view.model';
import * as moment from 'moment';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
isShow = true;
StoreData:boolean=true;
mode: ProgressSpinnerMode = 'indeterminate';
color: ThemePalette = 'accent';
value = 50;
flag = true;
dataSource:any;
creat:any;
datestring : any;
timestring : any;
campaigns:any=[];
campaigns2:any=[];
dates : any = [];
  constructor(private _main:MainService,
    private router:Router,
    private toastr:ToastrService) { }
@ViewChild('dataContainer') dataContainer: ElementRef | undefined;
  ngOnInit(): void {
    this.getAllCampaigns();
    this.dataSource = new MatTableDataSource<view_data>([]);
  }
  routeView(id:any){
    this.router.navigate(['main/view',id]);
  }

 
  getAllCampaigns(){
    this._main.getAllCampaigns(localStorage.getItem('email')).subscribe((data)=>{
      if(data){
        
        
        this.campaigns=data;
        
        
        
        // this.datestring = this.campaigns.created_on.substring(0,10)
        // this.timestring = this.campaigns.created_on.substring(12,19) 
        // this.creat = this.datestring + " " + this.timestring + " " + "IST"
        for(let ele of this.campaigns)
        {
          console.log(ele.created_on)
          //this.creat.nativeElement.innerHTML = "12/2/22";
         //this.datestring = ele.created_on.substring(0,10)
        //this.timestring = ele.created_on.substring(12,19) 
         //this.creat = this.datestring + " " + this.timestring + " " + "IST"
    
        }
        console.log(this.campaigns)

        //this.campaigns=data;
      }
    },err=>{
      this.toastr.error("Error in loading data");
    })
    
  }

  viewmore()
  {
    this.StoreData=false;
    this.isShow = !this.isShow
    this._main.viewmorecamp(localStorage.getItem('email')).subscribe((data)=>{
      if(data){
        this.flag = false;
        this.StoreData=true;
        this.campaigns2=data;
        
      }
    },
      err=>{
        this.toastr.error("Error in loading data");
      })
     
    }

}
