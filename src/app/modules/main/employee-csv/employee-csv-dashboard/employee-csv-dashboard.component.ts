import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-employee-csv-dashboard',
  templateUrl: './employee-csv-dashboard.component.html',
  styleUrls: ['./employee-csv-dashboard.component.css']
})
export class EmployeeCsvDashboardComponent implements OnInit {

  constructor(private commonService : CommonService) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
  }

}
