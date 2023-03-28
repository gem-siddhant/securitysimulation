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
  errormsg: string = '';
  username: string = '';
  initialemail: string = '';
  backgroundColor: string;
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
    this.backgroundColor = this.getRandomColor();
 
  }

  getClientDetails(id:any)
  { 
    this._superadmindashboard.getDetailedClientData(id).subscribe((data)=>
    {
      if(data)
      {
        this.clients=data
        this.dataSource = new MatTableDataSource(data.clientAdminDetailsList)
        this.getInitials()
      }
    })
  }
  getRandomColor() {
    // const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'];
    const colors = ['#38A3A5']
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  getInitials() {
    console.log(this.clients)
    for(let ele of this.clients.clientAdminDetailsList)
    {
      this.username = ele.adminName
      console.log(this.username)
      const parts = this.username.split(' ');
      this.initialemail = parts.map(part => part[0]).join('').toUpperCase();
    }
    
  }
}
