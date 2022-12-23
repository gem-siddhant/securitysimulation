import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {

   }
   getAllCampaigns(email:any){
    return this.http.post<any>('dashboard', email);
   }
   viewmorecamp(email:any)
   {
    return this.http.post<any>('viewMore', email);
   }
   sendUserDetails(obj:any){
     console.log('send user data',obj);
    return this.http.post<any>('register/click', obj);
   }
   senddetails(obj:any)
   {
    console.log('send user data',obj);
    return this.http.post<any>('admin/response', obj);
   }
   getCompaignDetails(id:any){
    let test:any=Number(id);
    return this.http.post<any>('task', test);
   }

   endcampaign(id:any){
    let end: any= Number(id);
    return this.http.post<any>('endCampaign',end);
   }
   killcampaign(id:any){
    let end: any= Number(id);
    return this.http.post<any>('killBtn',end);
   }
   signUp(form:any){
      return this.http.post<any>('onboard/user',form);
   }
   onboard(form:any){
    return this.http.post<any>('add/user',form);
 }
  scheduled(email:any){
    return this.http.post<any>('get/scheduled/tasks',email);
  }   
  deleteschedule(jobkey:any)
  {
    return this.http.post<any>('delete/job',jobkey);
  } 
}
