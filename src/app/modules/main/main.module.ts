import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { GiftComponent } from './gift/gift.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OnboardresComponent } from './onboard/onboardres/onboardres.component';
import { CustomtemplateComponent } from './customtemplate/customtemplate.component';
import { ScheduledCampaignsComponent } from './scheduled-campaigns/scheduled-campaigns.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin/dashboard-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManualComponent } from './user-manual/user-manual.component';
import { ClientInviteComponent } from './dashboard/dashboard-super-admin/Client-invite/client-invite/client-invite.component';
import { DashboardEmpComponent } from './dashboard/dashboard-emp/dashboard-emp.component';
import { DashboardSuperAdminComponent } from './dashboard/dashboard-super-admin/dashboad-landing/dashboard-super-admin.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AddCampaignComponent,
    LoginComponent,
    SignUpComponent,
    OnboardresComponent,
    CustomtemplateComponent,
    ScheduledCampaignsComponent,
    DashboardAdminComponent,
    UserManualComponent,
    ClientInviteComponent,
    DashboardEmpComponent,
    DashboardSuperAdminComponent
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
    MatIconModule,
  ]
})
export class MainModule { }
