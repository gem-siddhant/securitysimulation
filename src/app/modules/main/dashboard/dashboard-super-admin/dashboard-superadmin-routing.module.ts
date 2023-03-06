import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { ClientdetailsComponent } from './Client-view/clientdetails/clientdetails.component';
import { DashboardSuperAdminComponent } from './dashboad-landing/dashboard-super-admin.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'SuperAdmin',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardSuperAdminComponent,
  },
  {
    path: 'Clientdetails/:id',
    canActivate: [AuthGuard],
    component: ClientdetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardSuperAdminRoutingModule {}
