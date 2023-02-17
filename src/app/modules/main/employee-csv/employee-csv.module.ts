import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeCsvRoutingModule } from './employee-csv-routing.module';
import { EmployeeCsvDashboardComponent } from './employee-csv-dashboard/employee-csv-dashboard.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseTableComponent } from './course-table/course-table.component';
import { EmployeeCsvTableComponent } from './employee-csv-table/employee-csv-table.component';
import { SimulationTableComponent } from './simulation-table/simulation-table.component';


@NgModule({
  declarations: [
    EmployeeCsvDashboardComponent,
    ClientDetailsComponent,
    CourseTableComponent,
    EmployeeCsvTableComponent,
    SimulationTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeCsvRoutingModule
  ]
})
export class EmployeeCsvModule { }
