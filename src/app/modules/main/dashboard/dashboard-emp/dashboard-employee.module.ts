import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardEmployeeRoutingModule } from './dashboard-employee-routing.module';
import { DashboardEmpComponent } from './dashboard-superadmin/dashboard-emp.component';
import { EmployeeLearningComponent } from './employee-learning/employee-learning.component';

@NgModule({
  declarations: [
    DashboardEmpComponent,
    EmployeeLearningComponent
  ],
  imports: [
    SharedModule,
    DashboardEmployeeRoutingModule
  ]
})
export class DashboardEmployeeModule { }
