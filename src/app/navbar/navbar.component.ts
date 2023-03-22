import {
  Component,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { imgconst } from '../shared/Constants/constants';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ResponsiveService } from '../services/responsive.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  empId: any;
  changecolor: any = 'false';
  changecountercheck: number = 0;
  navBool: boolean = false;
  mobile: boolean;
  notifications: any;
  notifyData: any;
  dropdownData: any;
  notificationCount: any;
  tableLength: number = 0;
  tablePageIndex: number = 0;
  dataSource: any;
  pageNo: number = 1;
  unreadData: any;
  currentDate: any;
  campaigns: any;
  theme: string = '';
  color: string = '';
  simulationlogo: string = '';
  logoutlogo: string = '';
  currenttheme: string = sessionStorage.getItem('theme');
  content: string = 'Downloading your User Manual';
  profile = localStorage.getItem('Profile');
  static changecolor: any;
  isOpen = false;
  isSideBarOpened = true;
  username : string;
  constructor(
    private _auth: AuthService,
    private router: Router,
    private responsiveService: ResponsiveService,
    public commonService : CommonService,
  ) {
    this.mobile = false;
    this.username = '';
  }

  ngOnInit() : void {
    this.simulationlogo = imgconst.simulationlog;
    this.logoutlogo = imgconst.logoutlog;
    this.username =localStorage.getItem('name');

    this.checkMobile();
    this.onResize();
  }

  Logout() : void {
    this._auth.logout();
    localStorage.clear();
    window.onunload = () => {
      window.localStorage.clear();
    };
  }

  toggle() : void {
    this.sidenav.emit();
  }

  changetheme() {
    this.changecountercheck++;
    if (this.changecountercheck == 1) {
      this.changecolor = 'true';
      console.log('dark theme on ');
      console.log(this.changecolor);
      sessionStorage.setItem('theme', this.changecolor);
    }
    if (this.changecountercheck == 2) {
      this.changecolor = 'false';
      this.changecountercheck = 0;
      console.log('light theme on');
      console.log(this.changecolor);
      sessionStorage.setItem('theme', this.changecolor);
    }
  }

  navigateToScreen() : void{
    this.router.navigate([this.commonService.getScreenRouting()]);
  }

  checkMobile() : void {
    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
      if (isMobile) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    });
  }
  onResize() : void {
    this.responsiveService.checkWidth();
  }
  isScreenRoutingEmpty() : boolean{
    return this.commonService.getScreenRouting() === '';
  }
}
