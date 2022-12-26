import { HttpClient } from '@angular/common/http';
import { BoundElementProperty } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { isTemplateLiteral } from 'typescript';
import { InfomodalComponent } from '../shared/infomodal/infomodal.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  notificationBoolean: boolean = false;
  mail = new BehaviorSubject<any>(null);
  constructor(private http:HttpClient,private router:Router,private toastr: ToastrService,private dialog: MatDialog) {
    
   }
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

  getEmployeeDetailBehaviorSubject(): Observable<any> {

    return this.mail.asObservable();
  }
  setNotificationModalBoolean(value: boolean) {
    this.notificationBoolean = value;
  }
  getNotificationModalBoolean(){
    return this.notificationBoolean
  }
  // loginMethod2(creds:any){
  //   return this.http.post<any>('login', creds);
  //  }
  // setToken( email?: any,backend_token?:any) {
  //   return new Promise<void>((resolve, reject) => {
  //     localStorage.setItem('email',email);   
  //     this.loginMethod(email,backend_token).subscribe((item: any)=> {
  //     if (item)
  //     {
  //       localStorage.setItem('Manager',(item.data.isManager));
  //       localStorage.setItem('token',(item.message));
  //       localStorage.setItem('Profile',item.data.imageURL);
  //       resolve();   
  //     }
  //     else{
  //       reject();
  //     }
  
  //   },
  //   //(err: { status: number; })=>{ //link expired or request is already responded for the user.
  //     (err: { status: number; })=>{ //link expired or request is already responded for the user.
  //       if(err.status==404)
  //       {
  //       let dataDialog = { title: 'You Are NOT Authorized to use this Application' };
  //        const dialogRef = this.dialog.open(InfomodalComponent, {
  //          width: '513px',
  //          data: dataDialog
  //        });
  //        dialogRef.afterClosed().subscribe(()=>{
  //          this.router.navigate(['main/login']);
  //        })
  //      }
  //     }
    
    
  //   );
  // })
  //  }

  }

