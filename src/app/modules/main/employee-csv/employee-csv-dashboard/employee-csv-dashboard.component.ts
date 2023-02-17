import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-employee-csv-dashboard',
  templateUrl: './employee-csv-dashboard.component.html',
  styleUrls: ['./employee-csv-dashboard.component.css'],
})
export class EmployeeCsvDashboardComponent implements OnInit {

  searchForm: FormGroup;
  constructor(private commonService: CommonService, private formBuilder : FormBuilder) {
    this.searchForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.searchForm = this.formBuilder.group({
      searchText : [''],
      filterType : ['']
    });
  }
  applyFilter(){
    
  }
}
