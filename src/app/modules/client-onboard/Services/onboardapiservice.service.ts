import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { clientonboardapi } from 'src/app/shared/APIEndpoints/clientonboardapis';


@Injectable({
  providedIn: 'root'
})
export class OnboardapiserviceService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private dialog: MatDialog
  ) { }
 submitclientdetails(obj:any)
 {
  return this.http.post<any>(clientonboardapi.clientonboardsubmit,obj)
 }
 checkexpiration(obj:any)
 {
  return this.http.post<any>(clientonboardapi.linkexpiration,obj)
 }
}
