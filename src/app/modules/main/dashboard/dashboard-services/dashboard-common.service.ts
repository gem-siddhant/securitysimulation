import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommonService {
  dashboarddata : any;
  constructor() { }
  setdashboard(data:any)
  {
    this.dashboarddata = data
  }
  getdashboard()
  {
    return this.dashboarddata
  }
}
