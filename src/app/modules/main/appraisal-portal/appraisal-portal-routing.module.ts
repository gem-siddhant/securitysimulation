import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppraisalDashboardComponent } from './appraisal-dashboard/appraisal-dashboard.component';
import { AppraisalLoginComponent } from './appraisal-login/appraisal-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path : 'login',
    component: AppraisalLoginComponent,
  },
  {
    path : 'dashboard',
    component: AppraisalDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppraisalPortalRoutingModule { }
