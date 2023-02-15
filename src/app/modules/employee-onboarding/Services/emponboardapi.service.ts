import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { emponboardapis } from 'src/app/shared/APIEndpoints/emponboardapi';

@Injectable({
  providedIn: 'root'
})
export class EmponboardapiService {

  constructor(
    private http:HttpClient,
  ) { }
  checkexpiration(obj:any)
  {
    return this.http.post<any>(emponboardapis.linkexpirationcheck,obj)
  }
  sendotptoclient(email:any)
  {
   return this.http.post<any>(emponboardapis.sendotpclient,email)
  }
  validateclientotp(otp:any)
  {
    return this.http.post<any>(emponboardapis.validateclientotp,otp)
  }
  getUserDetails(userid:any)
  {
    return this.http.get<any>(emponboardapis.clientinfoprefilleddata+userid)
  }
}
