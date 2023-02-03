import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'campaignlist',
    pathMatch: 'full',
  },
  {
    path: 'campaignlist',
    canActivate: [AuthGuard],
    component: CampaignListComponent,
  },
  {
    path: 'campaigndetails',
    canActivate: [AuthGuard],
    component : CampaignViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
