import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { MainService } from '../modules/main/service/main.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ScheduleCampComponent } from '../shared/schedule-camp/schedule-camp.component';
import { name } from '@azure/msal-angular/packageMetadata';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  empId: any;
  navBool:boolean=false;
  mobile: boolean;
  isLoggedIn: boolean = false;
  notifications: any;
  notifyData: any;
  dropdownData: any;
  notificationCount: any;
  tableLength: number = 0;
  tablePageIndex: number = 0;
  dataSource: any;
  pageNo:number=1;
  unreadData:any;
  currentDate:any;
  campaigns:any;
  content:string="Downloading your User Manual";
  profile=localStorage.getItem('Profile')
  constructor(private _auth:AuthService,
    private _schedule: MainService,
    private dialog:MatDialog,
    private router:Router,
    private toastr:ToastrService) {
    this.mobile = false;
  }

  ngOnInit() {

  }
  getUser(){
    return localStorage.getItem('token');
  }
Logout(){
  this._auth.logout();
  console.log(this.profile)
}
toogletag(content:any )
{
  this.toastr.show(content);
}
scheduled()
{
 const email = localStorage.getItem('email');
 let reqbody = {
  'email': email
 }
 this._schedule.scheduled(reqbody).subscribe((data)=>{
  if(data)
  {
    const dialogRef = this.dialog.open(ScheduleCampComponent, {
    width: '650px',
    height: '350px', 
    
    });
    this.campaigns = data
    let i =1;
    for(let element of this.campaigns)
    {
      localStorage.setItem('createdon', element.createdOn)
      localStorage.setItem('name',element.name)
      localStorage.setItem('jobkey',element.scheduledJobKey)
      localStorage.setItem('scheduleid',element.id)
      localStorage.setItem('scheduledTime',element.scheduledTime)
    }
    console.log(this.campaigns)
  }
});
let a = localStorage.getItem('heading')
console.log(a)
}
}
function positionClass(content: any, positionClass: any, arg2: string) {
  throw new Error('Function not implemented.');
}

