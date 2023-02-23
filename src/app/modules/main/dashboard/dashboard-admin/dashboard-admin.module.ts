import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CampaignViewComponent } from './campaign-view copy 2/campaign-view.component';
import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    CampaignViewComponent,
  ],
  imports: [
    SharedModule,
    DashboardAdminRoutingModule
  ]
})
export class DashboardAdminModule { }
