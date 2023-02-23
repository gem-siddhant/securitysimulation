import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { CampaignListComponent } from './campaign-list/campaign-list.component';


@NgModule({
  declarations: [
    CampaignListComponent,
  ],
  imports: [
    SharedModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule { }
