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
   getCompaignDetails(id:any){
     let obj:any={
       id:5
     }
     let test:any='5';
    return this.http.get<any>('get/task', test);

   }
}
