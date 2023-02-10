import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCampaignStatus, PreviewFormData } from '../template-form/template-form.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(private http:HttpClient) { }
  
  getPrefilled(id:Number){
    return this.http.post<any>('prefilled/data', id);
  }

  sendtome(formData:PreviewFormData) : Observable<String>{
    return this.http.post<String>('send/email/to/yourself',formData);
  }
  
  createCampaign(formData: FormData) : Observable<CreateCampaignStatus>{
    return this.http.post<CreateCampaignStatus>('upload', formData);
  }

  schedulecampagin(formData:FormData) : Observable<String>{
    return this.http.post<String>('schedule/task',formData);
  }
}
