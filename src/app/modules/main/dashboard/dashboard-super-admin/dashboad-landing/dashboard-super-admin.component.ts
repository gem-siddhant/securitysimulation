import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { SuperAdminDashboardService } from '../../dashboard-services/super-admin-dashboard.service';


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
  select_val:any='';
  invitesentcount: number = 0;
  invitependingcount: number = 0;
  inviteacceptedcount : number = 0;
  totalclientcount: number = 0;
  dataSource: any;
  displayedColumns : string[] = ['clientName','clientEmail','inviteSentOn','inviteStatus','numOfAdmins','view']
  errormsg: string = '';
  username: string = '';
  initialemail: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private commonService : CommonService,
    private _superadmindashboard : SuperAdminDashboardService,
    private router:Router,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.getAllClient()
    this.getCountDetails()

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
  filterDrop(){
    this.errormsg = ''
    let filterValue=this.select_val;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
     if(this.dataSource.filteredData.length==0)
     {
      this.errormsg="no data found"
     }
  }

  getCountDetails()
  {
    this._superadmindashboard.pendingCount().subscribe((data)=>
    {
      if(data)
      {
        this.invitependingcount = data.pendingCount
      }
    },
    error => {
      console.error(error);
    })
    this._superadmindashboard.inviteSent().subscribe((data)=>
    {
      if(data)
      {
        this.invitesentcount = data.count
      }
    },
    error => {
      console.error(error);
    })
    this._superadmindashboard.acceptedCount().subscribe((data)=>
    {
      if(data)
      {
        this.inviteacceptedcount = data.acceptedCount
      }
    },
    error => {
      console.error(error);
    })
    this._superadmindashboard.totalClientCount().subscribe((data)=>
    {
      if(data)
      {
        this.totalclientcount = data.clientCount
      }
    },
    error => {
      console.error(error);
    })
  }


  getAllClient()
  {
    this._superadmindashboard.getAllClient().subscribe((data)=>
    {
      if(data)
      {
      
        this.campaigns = data
        this.dataSource = new MatTableDataSource(data)
        if(this.dataSource.length==0)
        {
         this.errormsg="no data found"
        }
        this.sortAndPaginate()
        this.dataSource.sort = this.sort;
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
  Routeview(element:any)
  {
    this.router.navigate(['main/Superadmin/Clientdetails',element]);
  }

}
