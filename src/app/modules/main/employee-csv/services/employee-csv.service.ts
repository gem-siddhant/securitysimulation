import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeCsv } from '../employee-client.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCsvService {

  constructor(private http:HttpClient) { }

  deleteEmployeeDetails(userId : string) : Observable<string>{
    return this.http.delete<string>(`delete/employee/${userId}`)
  }

  updateEmployeesCsv(){

  }

  getAllEmployees(emailId : string) : Observable<Array<EmployeeCsv>> {
    let reqObj = {
      'email' : emailId
    }
    return this.http.post<Array<EmployeeCsv>>('get/all/employees',reqObj);
  }

  getEmployeeCsvDetails(userId : string){
    return this.http.post('get/employee/csv/details',userId)
  }
}
