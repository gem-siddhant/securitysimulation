import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { ResponsiveService } from '../services/responsive.service';
import { imgconst } from '../shared/Constants/constants';
import { iconConst } from '../shared/Constants/constants';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  simulationlogo: String;
  logoutlogo: String;
  mobile: boolean;
  dashIcon : String;
  manualIcon : String;
  campIcon : String;
  scheduleIcon : String;
  analyticsIcon : String;
  employeecsvIcon : String;

  constructor(
    private _auth: AuthService,
    private responsiveService: ResponsiveService,
    private commonService: CommonService,
  ) {
    this.mobile = false;
    this.simulationlogo = imgconst.simulationlog;
    this.logoutlogo = iconConst.logoutIcon;
    this.dashIcon = iconConst.dashboardIcon;
    this.manualIcon = iconConst.manualIcon;
    this.analyticsIcon = iconConst.analyticsIcon;
    this.scheduleIcon = iconConst.scheduledIcon;
    this.employeecsvIcon = iconConst.employeeCsvIcon;
    this.campIcon = iconConst.campaignIcon;
  }

  ngOnInit(): void {
    this.checkMobile();
    this.onResize();
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

  toggle() : void {
    this.sidenav.emit();
  }

  close() : void {
    if (this.mobile) {
      this.commonService.setSideNavOpened(false);
    }
  }

  Logout() : void {
    this._auth.logout();
  }
}
