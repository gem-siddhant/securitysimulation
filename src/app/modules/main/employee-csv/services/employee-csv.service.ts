import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDetails, EmployeeCsv, UpdateEmployeeCsv } from '../employee-client.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCsvService {

  constructor(private http:HttpClient) { }

  deleteEmployeeDetails(userId : string) : Observable<string>{
    return this.http.delete<string>(`delete/employee/${userId}`)
  }

  updateEmployeesCsv(csvData : UpdateEmployeeCsv) : Observable<any>{
    return this.http.post<any>('update/employee/csv',csvData)
  }

  getAllEmployees(emailId : string) : Observable<Array<EmployeeCsv>> {
    let reqObj = {
      'email' : emailId
    }
    return this.http.post<Array<EmployeeCsv>>('get/all/employees',reqObj);
  }

  getEmployeeCsvDetails(userId : number) : Observable<ClientDetails>{
    return this.http.post<ClientDetails>('get/employee/csv/details',userId)
  }
}
