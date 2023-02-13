import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeCsvRoutingModule } from './employee-csv-routing.module';
import { EmployeeCsvDashboardComponent } from './employee-csv-dashboard/employee-csv-dashboard.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmployeeCsvDashboardComponent,
    ClientDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeCsvRoutingModule
  ]
})
export class EmployeeCsvModule { }
