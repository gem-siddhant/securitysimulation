import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private isSideNavOpened : boolean;
  private isLoggedIn : boolean;
  constructor() {
    this.isSideNavOpened = true;
    this.isLoggedIn = false;
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
