import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { MainService } from '../modules/main/service/main.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showme:boolean=false;
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
  fileUrl: any = "test.pdf";
  require: any 
  apiService: any;
  sourcePath ="E:\cybersec\devsecond\securitysimulation\src\app\navbar\test.pdf";
  fileName = "sample.pdf";
  //const FileSaver = require('file-saver');
  constructor(private _auth:AuthService, private sanitizer: DomSanitizer) {
    this.mobile = false;
  }
  invoiceId(invoiceId: any) {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    
  }
  getUser(){
    return localStorage.getItem('token');
  }
  toogletag(content: any)
  {
    alert(content)
  }
Logout(){
  this._auth.logout();
}
}
