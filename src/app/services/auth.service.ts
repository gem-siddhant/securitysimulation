import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  notificationBoolean: boolean = false;
  mail = new BehaviorSubject<any>(null);
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
  getEmployeeDetailBehaviorSubject(): Observable<any> {
    return this.mail.asObservable();
  }
  setNotificationModalBoolean(value: boolean) {
    this.notificationBoolean = value;
  }
  getNotificationModalBoolean(){
    return this.notificationBoolean
  }
  loginMethod(creds:any){
    return this.http.post<any>('login', creds);
   }
}
