import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(private http:HttpClient) { }
  
  getPrefilled(id:Number){
    return this.http.post<any>('prefilled/data', id);
  }
}
