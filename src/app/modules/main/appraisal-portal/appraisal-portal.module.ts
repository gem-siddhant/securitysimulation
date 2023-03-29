import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppraisalPortalRoutingModule } from './appraisal-portal-routing.module';
import { AppraisalLoginComponent } from './appraisal-login/appraisal-login.component';
import { AppraisalDashboardComponent } from './appraisal-dashboard/appraisal-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AppraisalLoginComponent,
    AppraisalDashboardComponent
  ],
  imports: [
    SharedModule,
    AppraisalPortalRoutingModule
  ]
})
export class AppraisalPortalModule { }
