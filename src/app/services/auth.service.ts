import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }
  checkLogin(){
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(["/main/login"]);

  }
  loginMethod(creds:any){
    return this.http.post<any>('login', creds);
   }
}
