import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject, Injectable, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { imgconst } from '../shared/Constants/constants';
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
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  empId: any;
  changecolor: any = 'false';
  changecountercheck: number = 0;
  navBool:boolean=false;
  mobile: boolean;
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
  theme:string=''
  color:string=''
  simulationlogo :string = '';
  logoutlogo : string = '';
  currenttheme: string = sessionStorage.getItem('theme')
  content:string="Downloading your User Manual";
  profile=localStorage.getItem('Profile')
  static changecolor: any;
  isOpen = false;
  isSideBarOpened = true;
  constructor(private _auth:AuthService,
    private _schedule: MainService,
    private dialog:MatDialog,
    private router:Router,
    private toastr:ToastrService) {
    this.mobile = false;
  }
  
ngOnInit() {
  this.simulationlogo = imgconst.simulationlog
  this.logoutlogo = imgconst.logoutlog
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
toggle()
{
  this.sidenav.emit();
}
// }
changetheme()
{
  this.changecountercheck++;
  if(this.changecountercheck == 1)
  {
  this.changecolor = 'true';
  console.log("dark theme on ")
  console.log(this.changecolor)
  sessionStorage.setItem('theme',this.changecolor)
  }
  if(this.changecountercheck == 2)
  {
    this.changecolor = 'false';
    this.changecountercheck = 0
    console.log("light theme on")
    console.log(this.changecolor)
    sessionStorage.setItem('theme',this.changecolor)
  }

  console.log(this.changecountercheck)
}

}

