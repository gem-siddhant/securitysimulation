import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClientInviteComponent } from '../modules/main/dashboard/dashboard-super-admin/Client-invite/client-invite/client-invite.component';
import { MainService } from '../modules/main/service/main.service';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { ResponsiveService } from '../services/responsive.service';
import { imgconst } from '../shared/Constants/constants';
import { roles } from '../shared/Constants/constants';
import { ScheduleCampComponent } from '../shared/schedule-camp/schedule-camp.component';
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
  roleuser : boolean = false;
  rolesa : boolean = false;
  roleadmin : boolean = false;
  constructor(
    private _auth: AuthService,
    private responsiveService: ResponsiveService,
    private commonService: CommonService,
    private dialog:MatDialog
  ) {
    this.mobile = false;
  }

  ngOnInit(): void {
    this.simulationlogo = imgconst.simulationlog;
    this.logoutlogo = imgconst.logoutlog;
    this.checkMobile();
    this.onResize();
    this.setRole();
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
  setRole()
  {
    if(localStorage.getItem('role')==roles.USER)
    {
      this.roleuser = true
    }
    else if(localStorage.getItem('role')==roles.ADMIN)
    {
      this.roleadmin = true
    }
    else if(localStorage.getItem('role')==roles.SUPER_ADMIN)
    {
      this.rolesa = true
    }
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

  inviteclient()
  {
    const dialogRef = this.dialog.open(ClientInviteComponent, {
      width: '840px',
      height: '570px',
    }); 
  }
}
