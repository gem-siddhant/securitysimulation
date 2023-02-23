import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Admin',
    pathMatch: 'full',
  },
//   {
//     path : 'Admin',
//     canActivate : [AuthGuard],
//     component: DashboardAdminComponent
//   },
  {
    path: 'Campaign-details',
    canActivate : [AuthGuard],
    component : CampaignViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class dashboardAdminRoutingModule {}
