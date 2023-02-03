import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';


@NgModule({
  declarations: [
    CampaignViewComponent,
    CampaignListComponent,
  ],
  imports: [
    SharedModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule { }
