import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { ChartType, ChartOptions, Chart } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
import {view_data} from './view.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { elementAt, startWith } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})


export class CampaignViewComponent implements OnInit {
campaignId:any;
endcampaignId:any;
  datenow = new Date();
  nowFormatted: string;
  notdelivered: any;
  submitted = false;
  ID: boolean = true;
  isendactive: any;
  constructor(private route: ActivatedRoute,
    private _router: Router,
    private _mainService:MainService,
    private toastr: ToastrService) 
    {
       this.viewData={id:0,email:'',ipAddress:'',status:''};
       this.nowFormatted = formatDate(this.datenow, 'dd-MM-yyyy', 'en-US');
    }
    nameCampaign:any;
    emailSubject:any;
    desc:any;
    status:any;
    remarks:any;
    errormsg:any;
    clickbtn:boolean= false;
clicked_len:any;
undelivered_len:any;
delivered_len:any;
pieChartOptions!: ChartOptions;
pieChartLabels!: Label[];
pieChartData!: SingleDataSet;
pieChartType!: ChartType;
pieChartLegend!: boolean;
viewData:view_data;
select_val:any='';
dataSource:any;
test: any= "test"
displayedColumns: string[] = ['sno','email', 'ip' , 'status'];
pieChartPlugins:any = [];
i: number = 1;
@ViewChild(MatSort, { static: true }) sort!: MatSort;
  ngOnInit(): void {
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['Clicked','Sent','NotDeliverd'];
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.pieChartPlugins = [pluginLabels];
    Chart.defaults['padding'] = 20,
    this.dataSource = new MatTableDataSource<view_data>([]);
    this.route.paramMap.subscribe((params: any) => {
    this.campaignId = params.get('id');
    this.endcampaignId= params.get('id');
    });
    this.getCampaignDetails(this.campaignId);
    
  }
  
  private createOptions(): ChartOptions {
    return {
      responsive: true,
          maintainAspectRatio: true,
          plugins: {
              labels: {
                render: 'percentage',
                fontColor: ['green', 'white', 'blue'],
                precision: 2
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
  filterDrop(){
   
    let filterValue=this.select_val;
      filterValue = filterValue.trim();
     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     if(filterValue.status=='DELIVERED')
     {
       this.notdelivered--;
     }
     this.errormsg=""
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
   sortData(sort: MatSort) {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    }
  }
  
  getCampaignDetails(id:any){
    localStorage.setItem('ID',id);
    this._mainService.getCompaignDetails(id).subscribe((data)=>{
     localStorage.setItem('isactive',data.isActive); 
     this.isendactive = localStorage.getItem('isactive')

     if(this.isendactive == 'false')
     {
       this.clickbtn = true;
     }
    
     if(data){
       this.clicked_len=data.openedCount;
       this.delivered_len=data.deliveredCount;
       this.notdelivered=data.totalCount;
       this.nameCampaign=data.template.heading;
       this.emailSubject=data.template.subject;
       this.desc=data.template.description;
       this.status=data.taskStatus;
       if (data.exceptionMessage==null)
       {
        this.remarks="No Remarks"
       }
       else{
        this.remarks=data.exceptionMessage;
       } 
       let i=1;
       for(let element of data.result){
         element.id=i;
         if(!element.ipAddress){
          element.ipAddress='NA';
         }

        ++i;

       }
        this.notdelivered = data.notDeliveredCount
        this.pieChartData = [this.clicked_len, this.delivered_len-this.clicked_len,this.notdelivered];
        this.dataSource = new MatTableDataSource<view_data>(data.result);
        this.dataSource.sort = this.sort;
      
      }
    },err=>{
      this.toastr.error("Error in loading data");
    })
  }

  endcamp()
  {
    this.submitted=true;
    let id: any = Number;
    id = localStorage.getItem('ID')
    this.ID= false;
    this._mainService.endcampaign(id).subscribe((data)=>{
      if(data)
      {
        this.ID=true;
        this.toastr.info("Campaign ended successfully");
      }
    })
  }

}