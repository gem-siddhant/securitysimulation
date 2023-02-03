import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { GiftComponent } from './gift/gift.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { LoginComponent } from './login/login.component';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OnboardresComponent } from './onboard/onboardres/onboardres.component';
import { CustomtemplateComponent } from './customtemplate/customtemplate.component';
import { ScheduledCampaignsComponent } from './scheduled-campaigns/scheduled-campaigns.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin/dashboard-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManualComponent } from './user-manual/user-manual.component';
import { ClientInviteComponent } from './dashboard/client-invite/client-invite.component';
@NgModule({
  declarations: [
    GiftComponent,
    AddCampaignComponent,
    LoginComponent,
    CampaignViewComponent,
    SignUpComponent,
    OnboardresComponent,
    CustomtemplateComponent,
    ScheduledCampaignsComponent,
    DashboardAdminComponent,
    UserManualComponent,
    ClientInviteComponent
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
