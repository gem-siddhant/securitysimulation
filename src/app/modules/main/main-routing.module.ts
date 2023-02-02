import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { CustomtemplateComponent } from './customtemplate/customtemplate.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin/dashboard-admin.component';
import { GiftComponent } from './gift/gift.component';
import { LoginComponent } from './login/login.component';
import { OnboardresComponent } from './onboard/onboardres/onboardres.component';
import { ScheduledCampaignsComponent } from './scheduled-campaigns/scheduled-campaigns.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserManualComponent } from './user-manual/user-manual.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'gifts',
    component: GiftComponent,
  },
  {
    path: 'add-campaign',
    canActivate: [AuthGuard],
    component: AddCampaignComponent,
  },
  {
    path: 'dashboard-admin',
    canActivate: [AuthGuard],
    component: DashboardAdminComponent,
  },
  {
    path: 'manual',
    canActivate: [AuthGuard],
    component: UserManualComponent,
  },
  {
    path: 'view/:id',
    canActivate: [AuthGuard],
    component: CampaignViewComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'onboard',
    component: OnboardresComponent,
  },
  {
    path: 'customtemplate',
    canActivate: [AuthGuard],
    component: CustomtemplateComponent,
  },
  {
    path:'scheduledCampaigns',
    canActivate: [AuthGuard],
    component:ScheduledCampaignsComponent
  },
  {
    path: 'campaign',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./campaigns/campaigns.module').then((m) => m.CampaignsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
