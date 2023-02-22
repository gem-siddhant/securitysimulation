import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { CampaignViewComponent } from './analytics/campaign-view/campaign-view.component';
import { CustomtemplateComponent } from './customtemplate/customtemplate.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin/dashboard-admin.component';
import { DashboardEmpComponent } from './dashboard/dashboard-emp/dashboard-emp.component';
import { DashboardSuperAdminComponent } from './dashboard/dashboard-super-admin/dashboad-landing/dashboard-super-admin.component';
import { ErrorPageComponent } from './error-page/error-page.component';
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
    component: ErrorPageComponent,
  },
  {
    path: 'add-campaign',
    canActivate: [AuthGuard],
    component: AddCampaignComponent,
  },
  {
    path: 'Admin',
    canActivate: [AuthGuard],
    component: DashboardAdminComponent,
  },
  {
    path: 'Employee',
    canActivate: [AuthGuard],
    component: DashboardEmpComponent,
  },
  {
    path: 'Superadmin',
    canActivate: [AuthGuard],
    component: DashboardSuperAdminComponent,
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
  {
    path: 'employee-csv',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./employee-csv/employee-csv.module').then((m) => m.EmployeeCsvModule),
  },
  {
    path: 'analytics',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./analytics/analytics.module').then((m) => m.AnalyticsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
