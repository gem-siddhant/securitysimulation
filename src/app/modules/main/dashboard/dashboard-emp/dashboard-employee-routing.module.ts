import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { DashboardEmpComponent } from './dashboard-superadmin/dashboard-emp.component';
import { EmployeeLearningComponent } from './employee-learning/employee-learning.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardEmpComponent,
  },
  {
    path: 'Employee',
    canActivate: [AuthGuard],
    component: DashboardEmpComponent,
  },
  {
    path: 'Learning',
    canActivate: [AuthGuard],
    component: EmployeeLearningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardEmployeeRoutingModule {}
