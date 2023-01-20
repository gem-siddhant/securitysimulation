import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignTemplatesComponent } from './campaign-templates/campaign-templates.component';
import { TemplateFormComponent } from './template-form/template-form.component';


@NgModule({
  declarations: [
    CampaignTemplatesComponent,
    TemplateFormComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule
  ]
})
export class CampaignsModule { }
