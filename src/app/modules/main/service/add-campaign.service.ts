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
  getPrefilled(id:any){
    return this.http.post<any>('prefilled/data', id);

  }
  schedulecampagin(formData:any){
    return this.http.post<any>('schedule/task',formData);
  }
  reshedule(formData:any)
  {
    return this.http.post<any>('reschedule/tasks',formData);
  }
  sendtome(formData:any)
  {
    return this.http.post<any>('send/email/to/yourself',formData);
  }

}
