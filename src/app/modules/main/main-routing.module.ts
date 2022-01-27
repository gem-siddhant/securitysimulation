import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { GiftComponent } from './gift/gift.component';

const routes: Routes = [{
  path:'gifts',
  component: GiftComponent,
},{
  path:'add-campaign',
  component:AddCampaignComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
