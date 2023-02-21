import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeCsv } from '../employee-client.model';
import { EmployeeCsvService } from '../services/employee-csv.service';

@Component({
  selector: 'app-employee-csv-dashboard',
  templateUrl: './employee-csv-dashboard.component.html',
  styleUrls: ['./employee-csv-dashboard.component.css'],
})
export class EmployeeCsvDashboardComponent implements OnInit {

  searchForm: FormGroup;
  employeeCsvTable: EmployeeCsv[];
  emailId : string;
  constructor(private commonService: CommonService, 
    private formBuilder : FormBuilder, 
    private employeeCsvService : EmployeeCsvService,
    private toastr : ToastrService) {
    this.searchForm = this.formBuilder.group({});
    this.employeeCsvTable = [] as EmployeeCsv[];
    this.emailId = '';
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.emailId = localStorage.getItem('email');
    this.getAllEmployees();
    this.searchForm = this.formBuilder.group({
      searchText : [''],
      filterType : ['']
    });
  }
  
  applyFilter(){
    
  }

  getAllEmployees(){
    this.employeeCsvService.getAllEmployees(this.emailId).pipe(take(1)).subscribe({
      next : (data)=>{
        this.employeeCsvTable = data;
      },
      error : (error)=>{
        this.toastr.error('Error while loading client details')
      }
    })
  }
}
