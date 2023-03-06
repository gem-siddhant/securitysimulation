import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { superadminapis, superadminclientdetails } from 'src/app/shared/APIEndpoints/superadmindashboardapi';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminDashboardService {

  constructor(private http:HttpClient) { }

  getAllClient()
  {
    return this.http.get<any>(superadminapis.allClients)
  }
  pendingCount() 
  {
    return this.http.get<any>(superadminapis.pendingCount)
  }
  acceptedCount()
  {
    return this.http.get<any>(superadminapis.acceptedCount)
  }
  inviteSent()
  {
    return this.http.get<any>(superadminapis.inviteCount)
  }
  totalClientCount()
  {
    return this.http.get<any>(superadminapis.clientCount)
  }
  getDetailedClientData(clientId:any)
  {
    return this.http.get<any>(superadminclientdetails.detailallclient+clientId);
  }
}
