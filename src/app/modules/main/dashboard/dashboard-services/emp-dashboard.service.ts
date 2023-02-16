import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empdashboardapis } from 'src/app/shared/APIEndpoints/empdashboardapi';

@Injectable({
  providedIn: 'root'
})
export class EmpDashboardService {

  constructor(private http: HttpClient) { }

  getTotalPhished(email:any)
  {
    return this.http.post<any>(empdashboardapis.totalphished,email)
  }
  getTotalCompleted(email:any)
  {
    return this.http.post<any>(empdashboardapis.totalcompleted,email)
  }
  getTotalCampaigns(email:any)
  {
    return this.http.post<any>(empdashboardapis.totalcampaigns,email)
  }
  getTableDetails(email:any)
  {
    return this.http.post<any>(empdashboardapis.tabledetails,email)
  }
}

