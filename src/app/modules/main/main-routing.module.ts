import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GiftComponent } from './gift/gift.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',
  component:LoginComponent
},
  {
  path:'login',
  component:LoginComponent
},
  {
  path:'gifts',
  component: GiftComponent,
},{
  path:'add-campaign',
  canActivate:[AuthGuard],
  component:AddCampaignComponent
},{
  path:'dashboard',
  canActivate:[AuthGuard],
  component:DashboardComponent
},{
  path:'view/:id',
  canActivate:[AuthGuard],
  component:CampaignViewComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
