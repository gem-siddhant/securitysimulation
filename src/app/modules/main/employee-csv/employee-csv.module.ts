import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeCsvRoutingModule } from './employee-csv-routing.module';
import { EmployeeCsvDashboardComponent } from './employee-csv-dashboard/employee-csv-dashboard.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeCsvTableComponent } from './employee-csv-table/employee-csv-table.component';
import { ClientSimulationTableComponent } from './client-simulation-table/client-simulation-table.component';


@NgModule({
  declarations: [
    EmployeeCsvDashboardComponent,
    ClientDetailsComponent,
    EmployeeCsvTableComponent,
    ClientSimulationTableComponent
  ],
  imports: [
    SharedModule,
    EmployeeCsvRoutingModule
  ]
})
export class EmployeeCsvModule { }
