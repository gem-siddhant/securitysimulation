import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { EmployeeCsvDashboardComponent } from './employee-csv-dashboard/employee-csv-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: EmployeeCsvDashboardComponent,
  },
  {
    path : 'client-details/:id',
    canActivate: [AuthGuard],
    component: ClientDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeCsvRoutingModule { }
