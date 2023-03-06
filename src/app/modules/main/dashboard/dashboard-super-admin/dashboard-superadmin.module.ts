import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientdetailsComponent } from './Client-view/clientdetails/clientdetails.component';
import { DashboardSuperAdminComponent } from './dashboad-landing/dashboard-super-admin.component';
import { DashboardSuperAdminRoutingModule } from './dashboard-superadmin-routing.module';


@NgModule({
  declarations: [
    DashboardSuperAdminComponent,
    ClientdetailsComponent
  ],
  imports: [
    SharedModule,
    DashboardSuperAdminRoutingModule
  ]
})
export class DashboardSuperAdminModule { }
