import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { ResponsiveService } from '../services/responsive.service';
import { imgconst } from '../shared/Constants/constants';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  simulationlogo: string = '';
  logoutlogo: string = '';
  mobile: boolean;
  constructor(
    private _auth: AuthService,
    private responsiveService: ResponsiveService,
    private commonService: CommonService
  ) {
    this.mobile = false;
  }

  ngOnInit(): void {
    this.simulationlogo = imgconst.simulationlog;
    this.logoutlogo = imgconst.logoutlog;
    this.checkMobile();
    this.onResize();
  }
  checkMobile() {
    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
      if (isMobile) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    });
  }
  onResize() {
    this.responsiveService.checkWidth();
  }
  getUser() {
    return localStorage.getItem('token');
  }
  toggle() {
    this.sidenav.emit();
  }
  close() {
    if (this.mobile) {
      this.commonService.setSideNavOpened(false);
    }
  }

  Logout() {
    this._auth.logout();
  }
}
