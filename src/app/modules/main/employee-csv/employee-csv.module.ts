import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeCsvRoutingModule } from './employee-csv-routing.module';
import { EmployeeCsvDashboardComponent } from './employee-csv-dashboard/employee-csv-dashboard.component';
import { ClientDetailsComponent } from './client-details/client-details.component';


@NgModule({
  declarations: [
    EmployeeCsvDashboardComponent,
    ClientDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeCsvRoutingModule
  ]
})
export class EmployeeCsvModule { }
