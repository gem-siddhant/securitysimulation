import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { ScriptElementKindModifier } from 'typescript';
import { MainService } from '../../service/main.service';

import * as pluginLabels from 'chartjs-plugin-labels';
import * as Chart from 'chart.js';
import { AnalyticsService } from '../analytics-service/analytics.service';
@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns:any=[];
  campaigns2:any=[];
  campaigns3:Map<string, Array<any>>;
  campaigns4:Map<string, Array<any>>;
  sentcount: number = 0;
  endedcount: number=0;
  killedcount: number=0;
  totalcampaigncount: number =0;
  dataSource: any;
  dataSource2: any;
  dataSource3: any
  isShow = true;
  displayedColumns: string[] = ['name','opened','delivered'];
  displayedColumns2: string[] = ['name of manager','total phished employees']
  displayedColumns3: string[] = ['name of department','total phished employees']
  mode: ProgressSpinnerMode = 'determinate';
  color:any;
  bufferValue = 75;
  value = 100;
  clickcount = 0
  sendanalytics: number = 0
  killedanalytics: number= 0;
  endedanalytics: number= 0;
  offenderscount : number;
  listview:boolean = true;
  detailview:boolean = false;
  totalclickcount : number =0;
  totalclickcountviewmore : number = 0;
  totaldeliveredcount1 : number = 0;
  totaldeliveredcount2 : number = 0;
  pieChartOptions!: ChartOptions;
  pieChartLabels!: Label[];
  pieChartData!: SingleDataSet;
  pieChartType!: ChartType;
  pieChartLegend!: boolean;
  pieChartPlugins:any = [];
  managercount: number = 0;
  managername : string ='';
  public taskId: number;
  public chart: Chart;
  constructor( private commonService : CommonService,
    private _main:MainService,
    private router:Router,
    private _analytics:AnalyticsService,
    private toastr:ToastrService) {
      this.campaigns3 = new Map<string,Array<any>>();
    }

  ngOnInit(): void {
 
    this.commonService.setLoginStatus(true);
    this.commonService.setNavTitle('Analytics');
    this.commonService.setScreenRouting('');
    this.getAllCampaigns();
    this.viewmore();
    this.getRepeatativeoffender()
    this.totalclickcount = this.totalclickcount+this.totalclickcountviewmore
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['totalcampaign','totalclicked','totalDeliverd'];
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.pieChartPlugins = [pluginLabels];
    this.piechartdata()
    Chart.defaults['padding'] = 50;
  }

  // manager wise 
  createManagerBarChart(nameLabels : Array<string>, totalPhishedLabels : Array<number>) : void{
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: nameLabels,
        datasets: [
          {
            label: "manager wise phished",
            data: totalPhishedLabels,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'total phished count'
              }
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'names of manager'
              }
            },
          ]
        }
      }
    });
  }

  // department wise 
  createDepartmentBarChart(nameLabels : Array<string>, totalPhishedLabels : Array<number>) : void{
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: nameLabels,
        datasets: [
          {
            label: "manager wise phished",
            data: totalPhishedLabels,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'total phished count'
              }
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'names of manager'
              }
            },
          ]
        }
      }
    });
  }
  
  private createOptions(): ChartOptions {
    return {
      responsive: true,
          maintainAspectRatio: true,
          plugins: {
              labels: {
                render: 'percentage',
                fontColor: ['green', 'white', 'blue'],
                precision: 2,
                innerWidth: 10,
              }
          },
          legend: {
            display: true,
            position: 'left',
            align: 'start',
            fullWidth : true,

          }
         
    };
  }

  getRepeatativeoffender()
  {
    let req = {
      'email':localStorage.getItem('email')
    }
    this._analytics.getrepeatedoffenders(req).subscribe((data)=>
    {
      if(data)
      {
      this.offenderscount = data.repeatedOffendersCount
      }
    })
  }

  getDepartmentwisedata()
  {
    this._analytics.getdepartmentwise(this.taskId).subscribe((data)=>
    {
      if(data)
      {
        let arr = [];
        let nameLabels = [];
        let totalPhishedLabels = [];
        this.campaigns4 = data
        for (let key in data) {
          let obj = {
            name : key,
            length: data[key].length
          }
          nameLabels.push(key);
          totalPhishedLabels.push(data[key].length);
          arr.push(obj);
          this.managername = key
         }
         this.createDepartmentBarChart(nameLabels,totalPhishedLabels)
         this.dataSource3 = new MatTableDataSource(arr);
      }
    })
  }
  
  getManagerwisedata()
  {
    this._analytics.getmanagerwise(this.taskId).subscribe((data)=>
    {
      if(data)
      {
        let arr = [];
        let nameLabels = [];
        let totalPhishedLabels = [];
        this.campaigns3 = data
        for (let key in data) {
          let obj = {
            name : key,
            length: data[key].length
          }
          nameLabels.push(key);
          totalPhishedLabels.push(data[key].length);
          arr.push(obj);
          this.managername = key
         }
         this.createManagerBarChart(nameLabels,totalPhishedLabels)
         this.dataSource3 = new MatTableDataSource(arr);
      }
    })
    
  }
  camplistview()
  {
    this.listview = true
    this.detailview = false
  }
  campdetailview()
  {
    this.detailview = true
    this.listview = false
  }

  getAllCampaigns(){
    this._main.getAllCampaigns(localStorage.getItem('email')).subscribe((data)=>{
      if(data){
        this.campaigns=data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource = this.dataSource.filteredData
        this.taskId  = this.dataSource[2].taskId
        this.getManagerwisedata()
        // console.log(this.taskId)
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
          if(ele.opened>0)
          {
            this.totalclickcount = this.totalclickcount + ele.opened
          }
          if(ele.delivered)
          {
            this.totaldeliveredcount1 = this.totaldeliveredcount1 + ele.delivered
          }
        }
        this.pieChartData = [ this.totalcampaigncount,  this.totalclickcount, this.totaldeliveredcount1+this.totaldeliveredcount2];
        console.log(this.pieChartData)

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
          if(ele.opened==1)
          {
            this.totalclickcountviewmore = this.totalclickcountviewmore + ele.opened
          }
          if(ele.delivered)
          {
            this.totaldeliveredcount2 = this.totaldeliveredcount2 + ele.delivered
          }
        }
      }
      this.pieChartData = [ this.totalcampaigncount,  this.totalclickcount, this.totaldeliveredcount1+this.totaldeliveredcount2];
    }
    this.sendanalytics = Math.ceil((this.sentcount/this.totalcampaigncount)*100)
    this.killedanalytics = Math.ceil((this.killedcount/this.totalcampaigncount)*100)
    this.endedanalytics = Math.ceil((this.endedcount/this.totalcampaigncount)*100)
    },
      err=>{
        this.toastr.error("Error in loading data");
      })
     
    }

    piechartdata()
    {
      this.pieChartData = [ this.totalcampaigncount,  this.totalclickcount, this.totaldeliveredcount1+this.totaldeliveredcount2];
    }
    Routeview(element:any)
    {
      this.router.navigate(['main/analytics/campaigndetails',element]);
    }
}
