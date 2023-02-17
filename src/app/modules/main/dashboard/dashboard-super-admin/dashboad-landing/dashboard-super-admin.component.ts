import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { SuperAdminDashboardService } from '../../../service/super-admin-dashboard.service';


@Component({
  selector: 'app-dashboard-super-admin',
  templateUrl: './dashboard-super-admin.component.html',
  styleUrls: ['./dashboard-super-admin.component.css']
})
export class DashboardSuperAdminComponent implements OnInit {
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
  displayedColumns : string[] = ['clientName','clientEmail','inviteSentOn','inviteStatus','numOfAdmins','view']
  phishedanalytics: number = 0;
  campcompletedanalytics: number = 0;
  scoreanalytics: number = 0;
  constructor(private commonService : CommonService,
    private _superadmindashboard : SuperAdminDashboardService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this. getAllClient()
  }

  getAllClient()
  {
    this._superadmindashboard.getAllClient().subscribe((data)=>
    {
      if(data)
      {
        this.campaigns = data
        this.dataSource = new MatTableDataSource(data)
      }
    },
    (err)=>
    {
      if(err.status!=200)
      {
        this.toastr.error("No Client Onboarded yet" , undefined , 
        {
          positionClass : 'toaster-top-center'
        })
      }
    })
  }
}
