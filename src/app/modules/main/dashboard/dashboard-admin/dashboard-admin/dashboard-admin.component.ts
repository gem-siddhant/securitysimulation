import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../../service/main.service';
import {view_data} from './dashboard-view';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from 'src/app/services/common.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DashboardpopupmodalComponent } from 'src/app/shared/Modals/dashboardpopupmodal/dashboardpopupmodal.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { take } from 'rxjs';
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
  dashTable : any;
  dataSource: MatTableDataSource<any>;
  dataSource2: any;
  select_val:any='';
  isShow = true;
  displayedColumns: string[] = ['name','all','opened','delivered','notDelivered','date','starttime','endtime','taskStatus','taskid'];
  mode: ProgressSpinnerMode = 'determinate';
  color:any;
  bufferValue = 75;
  value = 100;
  clickcount = 0
  sendanalytics: number = 0
  killedanalytics: number= 0;
  endedanalytics: number= 0;
  errormsg: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _main:MainService,
    private commonService : CommonService,
    private router:Router,
    private dialog:MatDialog,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.commonService.setNavTitle('Dashboard');
    this.commonService.setScreenRouting('');
    this.getAllCampaigns();
  }
  ngAfterViewInit() {
    this.dashTable.paginator = this.paginator;
  }
  sortAndPaginate() {
    this.dashTable.paginator = this.paginator;
    this.dashTable.sort = this.sort;
  }
  getAllCampaigns(){
    let req={
      'email':localStorage.getItem('email')
    }
    this._main.getAllCampaigns(req).pipe(take(1)).subscribe((data)=>{
      if(data){
        this.campaigns=data;
        this.dataSource = new MatTableDataSource(data);
        this.onTabChange()
        for(let ele of this.campaigns)
        {
          if(ele.status=='SENT' || ele.status=='FAILED' || ele.status=='IN PROGRESS' || ele.status=='ENDED' || ele.status=='SCHEDULED' || ele.status=='KILLED')
          {
            this.totalcampaigncount++
          }
          if(ele.status=='KILLED' || ele.status=='FAILED')
          {
            this.killedcount++
          }
          if(ele.status=='ENDED' || ele.status=='SENT')
          {
            this.endedcount++
          }
          if(ele.status=='IN PROGRESS' || ele.status=='SCHEDULED')
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

  allcamps()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'right-dialog';
    this.commonService.setbuttonclick('ALL')
    const dialogRef = this.dialog.open(DashboardpopupmodalComponent,  {
      width : '990px',
      // position: { right: 1 + 'px'}, 
      hasBackdrop : true
    })
      // {
  //     width: '750px',
      
  //   });
  }
 completedcamps()
  {
    this.commonService.setbuttonclick('COMPLETED')
    const dialogRef = this.dialog.open(DashboardpopupmodalComponent, {
      width : '990px',
      // position: { right: 1 + 'px'}, 
      hasBackdrop : true
    });
  }
  failedcamps()
  {
    this.commonService.setbuttonclick('FAILURE')
    const dialogRef = this.dialog.open(DashboardpopupmodalComponent, {
      width : '990px',
      // position: { right: 1 + 'px'}, 
      hasBackdrop : true
    });
  }
  ongoingschedule()
  {
    this.commonService.setbuttonclick('LAST')
    const dialogRef = this.dialog.open(DashboardpopupmodalComponent, {
      width : '990px',
      // position: { right: 1 + 'px'}, 
      hasBackdrop : true
    });
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
          if(ele.status=='SENT' || ele.taskStatus=='FAILED' || ele.taskStatus=='IN PROGRESS' || ele.taskStatus=='ENDED')
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
    Routeview(element:any)
    {
      this.router.navigate(['main/Admin/campaigndetails',element]);
    }
    scheduleroute()
    {
      this.router.navigate(['main/scheduledCampaigns']);
      this.dialog.closeAll()
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
      let filterValue=this.select_val;
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      //  if(this.dataSource.filteredData.length==0)
      //  {
      //   this.errormsg="no data found"
      //  }
    }
  onTabChange(event? : MatTabChangeEvent){
    let tab = 'Recent Campaigns';
    let tableData: any[] = [];
    if(event){
      tab = event.tab.textLabel;
    }
    if(tab === 'Recent Campaigns'){
      if(this.dataSource){
        tableData = this.dataSource.filteredData.filter((element : any)=>{
          return element.status !== 'SCHEDULED';
        })
      }
    }
    else if(tab === 'Scheduled Campaigns'){
      if(this.dataSource){
        tableData = this.dataSource.filteredData.filter((element : any)=>{
          return element.status === 'SCHEDULED';
        })
      }
    }
    this.dashTable = new MatTableDataSource(tableData);
    this.sortAndPaginate()
    this.errormsg=""
    if(this.dashTable.filteredData.length==0){
      this.errormsg="no data found"
    }
  }
}
