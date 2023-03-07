import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginapi } from 'src/app/shared/APIEndpoints/loginapis';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient,
  ) { }
  sendEmailLink(obj:any)
  {
    return this.http.post<any>(loginapi.forgotpassword,obj)
  }
}
