import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { CustomtemplateComponent } from './customtemplate/customtemplate.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin/dashboard-admin.component';
import { DashboardEmpComponent } from './dashboard/dashboard-emp/dashboard-superadmin/dashboard-emp.component';
import { EmployeeLearningComponent } from './dashboard/dashboard-emp/employee-learning/employee-learning.component';
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
    path: 'appraisal-portal',
    loadChildren: () =>
      import('./appraisal-portal/appraisal-portal.module').then((m) => m.AppraisalPortalModule),
  },
  {
    path: 'add-campaign',
    canActivate: [AuthGuard],
    component: AddCampaignComponent,
  },
  // {
  //   path: 'Admin',
  //   canActivate: [AuthGuard],
  //   component: DashboardAdminComponent,
  // },
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
    path: 'Admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard-admin/dashboard-admin.module').then((m) => m.DashboardAdminModule),
  },
  {
    path: 'Superadmin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard-super-admin/dashboard-superadmin.module').then((m) => m.DashboardSuperAdminModule),
  },
  // {
  //   path: 'Employee',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./dashboard/dashboard-emp/dashboard-employee.module').then((m) => m.DashboardEmployeeModule),
  // },
  {
    path: 'Employee',
    canActivate: [AuthGuard],
    component: DashboardEmpComponent,
  },
  {
    path: 'Learning',
    canActivate: [AuthGuard],
    component: EmployeeLearningComponent,
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
