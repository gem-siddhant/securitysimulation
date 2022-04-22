import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
  content:string="Please press OK to Download your user guide";
  constructor(private _auth:AuthService) {
    this.mobile = false;
  }

  ngOnInit() {

  }
  getUser(){
    return localStorage.getItem('token');
  }
Logout(){
  this._auth.logout();
}
toogletag(content: any)
{
  alert(content)
}
}
