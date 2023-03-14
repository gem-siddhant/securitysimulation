import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  campaigns:any=[];
  tile1:boolean=false;
  tile2:boolean=false;
  displayedColumns: string[] = ['name','opened','delivered','notDelivered','created_on','taskStatus','taskid'];
  constructor(private _main:MainService,
    private commonService : CommonService,
    private router:Router,
    private dialog:MatDialog,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.getAllCampaigns();
  }
  getAllCampaigns(){
    this._main.getAllCampaigns(localStorage.getItem('email')).subscribe((data)=>{
      if(data){
        this.campaigns=data;
        console.log(this.campaigns)
        let sentcamps:any=[];
        for(let ele of this.campaigns)
        {
          if(ele.taskStatus=='SENT')
          {
            this.tile1=true
            sentcamps.push(ele)
          }
          this.dataSource = new MatTableDataSource(sentcamps)
        }

        let endedcamps:any=[];
        for(let ele of this.campaigns)
        {
          if(ele.taskStatus=='ENDED')
          {
            this.tile2 = true
            endedcamps.push(ele)
          }
          this.dataSource2 = new MatTableDataSource(endedcamps)
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
}
