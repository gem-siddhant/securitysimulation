import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { dashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';


@NgModule({
  declarations: [
      DashboardAdminComponent,
      CampaignViewComponent
  ],
  imports: [
    SharedModule,
    dashboardAdminRoutingModule
  ]
})
export class dashboardAdminModule { }
