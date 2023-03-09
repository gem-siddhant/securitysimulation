import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private isSideNavOpened : boolean;
  private isLoggedIn : boolean;
  screenRouting : string;
  navbarTitle : string;
  constructor() {
    this.isSideNavOpened = true;
    this.isLoggedIn = false;
    this.screenRouting = '';
    this.navbarTitle = '';
  }
  getNavTitle() : string{
    return this.navbarTitle;
  }
  setNavTitle(val : string) : void{
    this.navbarTitle = val;
  }
  getScreenRouting() : string{
    return this.screenRouting
  }
  setScreenRouting(val : string) : void{
    this.screenRouting = val;
  }
  getSideNavOpened() : boolean{
    return this.isSideNavOpened;
  }
  setSideNavOpened(val : boolean) : void{
    this.isSideNavOpened = val;
  }
  getLoginStatus() : boolean{
    return this.isLoggedIn;
  }
  setLoginStatus(val : boolean) : void{
    this.isLoggedIn = val;
  }
}
