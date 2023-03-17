import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/modules/main/service/main.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboardpopupmodal',
  templateUrl: './dashboardpopupmodal.component.html',
  styleUrls: ['./dashboardpopupmodal.component.css']
})
export class DashboardpopupmodalComponent implements OnInit {
  dataSource:any;
  dataSource2:any;
  dataSource3:any;
  dataSource4:any;
  totaldata : any = [];
  campaigns:any=[];
  campaigns2:any=[];
  campaigns3:any=[];
  campaigns4:any=[];
  finaldata :any = [];
  finalcampaigns:any;
  viewtab : any;
  errormsg = ""
  displayedColumns: string[] = ['name','all','opened','delivered','notDelivered','date','starttime','endtime','taskStatus','taskid'];
  constructor(private _main:MainService,
    private commonService : CommonService,
    private router:Router,
    private dialog:MatDialog,
    public dialogRef:MatDialogRef<DashboardpopupmodalComponent>,
    private toastr:ToastrService) { }
    @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.viewtab=this.commonService.getbuttonclick()
    console.log(this.viewtab)
    this.getAllCampaigns();
  }

  getAllCampaigns(){
    let req = {
      'email' : localStorage.getItem('email')
    }
    this._main.getAllCampaigns(req).subscribe((data)=>{
      if(data){
        this.totaldata =data
        console.log(this.campaigns)
        for(let ele of this.totaldata)
        {
          if(ele.status=='SENT' || ele.status=='ENDED' || ele.status=='FAILED' || ele.status=='SCHEDULED' || ele.status=='IN PROGRESS')
          {
            this.campaigns.push(ele)
          }
          this.dataSource = new MatTableDataSource(this.campaigns)
          if(ele.status=='ENDED' || ele.status=='SENT')
          {
            this.campaigns2.push(ele)
          }
          this.dataSource2 = new MatTableDataSource(this.campaigns2)
          if(ele.status=='FAILED' || ele.status=='KILLED')
          {
            this.campaigns3.push(ele)
          }
          this.dataSource3 = new MatTableDataSource(this.campaigns3)
          if(ele.status=='IN PROGRESS' || ele.status=='SCHEDULED')
          {
            this.campaigns4.push(ele)
          }
          this.dataSource4 = new MatTableDataSource(this.campaigns4)
        }

        if(this.viewtab=='ALL')
        {
          this.finaldata = this.dataSource
          this.finalcampaigns = this.campaigns
        }
        else if(this.viewtab=='COMPLETED')
        {
          this.finaldata = this.dataSource2
          this.finalcampaigns = this.campaigns2
        }
        else if(this.viewtab=='FAILURE')
        {
          this.finaldata = this.dataSource3
          this.finalcampaigns = this.campaigns3
        }
        else if(this.viewtab=='LAST')
        {
          this.finaldata = this.dataSource4
          this.finalcampaigns = this.campaigns4
        }
        this.finaldata.paginator = this.paginator;
        console.log(this.finaldata.filteredData.length)
        this.errormsg=""
        if(this.finaldata.filteredData.length==0)
        {
         this.errormsg="no data found"
        }
      }
    },err=>{
      this.toastr.error("Error in loading data");
    })
    
  }
  Routeview(element:any)
  {
    this.router.navigate(['main/Admin/campaigndetails',element]);
    this.dialog.closeAll()
  }
  scheduleroute()
  {
    this.router.navigate(['main/scheduledCampaigns']);
    this.dialog.closeAll()
  }
  onClose() {
    this.dialogRef.close();
  }  
}
