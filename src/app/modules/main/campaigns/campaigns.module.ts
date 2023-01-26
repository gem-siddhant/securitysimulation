import { NgModule } from '@angular/core';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignTemplatesComponent } from './campaign-templates/campaign-templates.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CampaignTemplatesComponent,
    TemplateFormComponent
  ],
  imports: [
    SharedModule,
    CampaignsRoutingModule,
  ]
})
export class CampaignsModule { }
