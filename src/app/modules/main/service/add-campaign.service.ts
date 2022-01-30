import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddCampaignService {

  constructor(private http:HttpClient) { }
  createCampaign(formData: any) {
    return this.http.post<any>('upload', formData);
  }
}
