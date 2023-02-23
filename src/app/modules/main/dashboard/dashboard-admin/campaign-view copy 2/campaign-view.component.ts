import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ReconfirmModalComponent } from 'src/app/shared/reconfirm-modal/reconfirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CampaignConfirmComponent } from 'src/app/shared/campaign-confirm/campaign-confirm.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { CommonService } from 'src/app/services/common.service';
import { MainService } from '../../../service/main.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})


export class CampaignViewComponent implements OnInit {
campaignId:any;
endcampaignId:any;
StoreData:boolean=true;
  datenow = new Date();
  nowFormatted: string;
  notdelivered: any;
  submitted = false;
  ID: boolean = true;
  isendactive: any;
  constructor(private route: ActivatedRoute,
    private commonService : CommonService,
    private _router: Router,
    private _mainService:MainService,
    private dialog:MatDialog,
    private toastr: ToastrService) 
    {
       this.viewData={id:0,email:'',ipAddress:'',status:''};
       this.nowFormatted = formatDate(this.datenow, 'dd-MM-yyyy', 'en-US');
    }
    color: ThemePalette = 'accent';
    value = 50;
    mode: ProgressSpinnerMode = 'indeterminate';
    nameCampaign:any;
    emailSubject:any;
    desc:any;
    status:any;
    remarks:any;
    errormsg:any;
    clickbtn:boolean= false;
    campstatus = localStorage.getItem('campstatus')
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
killcam:boolean=false;
test: any= "test";
displayedColumns: string[] = ['sno','email', 'ip' , 'status',];
pieChartPlugins:any = [];
i: number = 1;
id: string;
@ViewChild(MatSort, { static: true }) sort!: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
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
     console.log(this.dataSource.filteredData.length)
     if(this.dataSource.filteredData.length==0)
     {
      this.errormsg="no data found"
     }
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
       console.log(this.dataSource.data)
      
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
        if(this.dataSource.length>10)
        {
        this.sortAndPaginate()
        }
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data)
      
      }
    },err=>{
      this.toastr.error("Error in loading data");
    })
  }

  endcamp()
  {
    this.id = localStorage.getItem('ID')
    let dataDialog = { title: 'Are you sure you want to End this campaign?' };
    const dialogRef = this.dialog.open(CampaignConfirmComponent, {
      width: '513px',
      data: dataDialog
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(result)
      if(result==true)
      {
        this._mainService.endcampaign(this.id).subscribe((data)=>{
          if(data)
          {
        localStorage.setItem("Campstatus",data.status)
        let dataDialog = { title: 'Campaign Ended Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '400px',
          height:'400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this._router.navigate(['main/campaign-view']);
          window.location.reload()
        })
          }
        })
      }

  }
    )
  }
  // killcamp()
  // {
  //   this.id = localStorage.getItem('ID')
  //   let dataDialog = { title: 'This functionality is under development' };
  //   const dialogRef = this.dialog.open(CampaignConfirmComponent, {
  //     width: '513px',
  //     data: dataDialog
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //     console.log(result)
  //   })
  // }
  killcamp()
  {
    this.id = localStorage.getItem('ID')
    let dataDialog = { title: 'Are you sure you want to kill this campaign?' };
    const dialogRef = this.dialog.open(CampaignConfirmComponent, {
      width: '513px',
      data: dataDialog
    });
   
    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      console.log(result)
      // setTimeout(function() {
      // }, 10000);
      this.StoreData=false;  
      if(result==true)
      {
        this._mainService.killcampaign(this.id).subscribe(async (data)=>{
          const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
          await sleep(10000);
          if(data)
          {  
            this.StoreData=true;
        this.killcam = true    
        localStorage.setItem("Campstatus",data.status)
        let dataDialog = { title: 'Campaign Killed Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '400px',
          height:'400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this._router.navigate(['main/campaign-view']);
          window.location.reload()
        })
          }
        })
      }

  }
    )}
}