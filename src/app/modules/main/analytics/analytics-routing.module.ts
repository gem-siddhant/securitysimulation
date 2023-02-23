import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
