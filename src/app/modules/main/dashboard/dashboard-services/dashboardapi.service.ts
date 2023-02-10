import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { dashboardapis } from 'src/app/shared/APIEndpoints/dashboardapi';

@Injectable({
  providedIn: 'root'
})
export class DashboardapiService {

  constructor(private http:HttpClient,
    private router:Router,
    private dialog: MatDialog) { }

    inviteclient(obj:any)
    {
       return this.http.post<any>(dashboardapis.inviteclientapi,obj)
    }
}


