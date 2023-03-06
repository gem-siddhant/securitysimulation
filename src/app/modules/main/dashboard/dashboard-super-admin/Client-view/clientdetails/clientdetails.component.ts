import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { SuperAdminDashboardService } from '../../../dashboard-services/super-admin-dashboard.service';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.css']
})
export class ClientdetailsComponent implements OnInit {
  clientId:any;
  dataSource:any;
  displayedColumns : string[] = ['adminName','adminEmail','addedOn','remove']
  clients :any = [];
  constructor(
    private commonService : CommonService,
    private _superadmindashboard : SuperAdminDashboardService,
    private router:Router,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    
  ) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.route.paramMap.subscribe((params: any) => {
    this.clientId = params.get('id');
    });
    this.getClientDetails(this.clientId)
  }

  getClientDetails(id:any)
  { 
    this._superadmindashboard.getDetailedClientData(id).subscribe((data)=>
    {
      if(data)
      {
        this.clients=data
        this.dataSource = new MatTableDataSource(data.clientAdminDetailsList)
      }
    })
  }
}
