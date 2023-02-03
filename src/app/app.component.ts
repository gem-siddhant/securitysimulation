import {
  Component,
  OnInit,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ResponsiveService } from './services/responsive.service';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild(MatSidenav)
  title = 'gift-project';
  sidenav!: MatSidenav;
  sideNavMode: any;
  mobile: boolean;

  constructor(
    private responsiveService: ResponsiveService,
    private commonService: CommonService,
    private cd: ChangeDetectorRef
  ) {
    this.mobile = false;
    this.sideNavMode = 'side';
  }
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.checkMobile();
    this.onResize();
    console.log(localStorage.getItem('token'))
  }
  getSideNavOpened(): boolean {
    return this.commonService.getSideNavOpened();
  }
  getLoginStatus(): boolean {
    return this.commonService.getLoginStatus();
  }
  checkMobile() {
    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
      if (isMobile) {
        this.sideNavMode = 'over';
        this.commonService.setSideNavOpened(false);
        this.mobile = true;
      } else {
        this.sideNavMode = 'side';
        this.commonService.setSideNavOpened(true);
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
  open() {
    this.commonService.setSideNavOpened(true);
  }
  close() {
    if (this.mobile) {
      this.commonService.setSideNavOpened(false);
    }
  }
  toggle() {
    this.commonService.setSideNavOpened(!this.commonService.getSideNavOpened());
  }
}
