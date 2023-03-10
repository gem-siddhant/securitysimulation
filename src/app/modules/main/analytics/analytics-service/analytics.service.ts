import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { analyticsapis, empdashboardapis } from 'src/app/shared/APIEndpoints/empdashboardapi';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private http:HttpClient
  ) { }
  getrepeatedoffenders(obj:any)
  {
    return this.http.post<any>(analyticsapis.totaloffenders,obj);
  }
  getdepartmentwise(taskid:any)
  {
    return this.http.get<any>(analyticsapis.departmentwise+taskid)
  }
  getmanagerwise(taskId:any)
  {
    return this.http.get<any>(analyticsapis.managerwise+taskId)
  }
}
