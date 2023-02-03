import { NgModule } from '@angular/core';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignTemplatesComponent } from './campaign-templates/campaign-templates.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomFormComponent } from './custom-form/custom-form.component';


@NgModule({
  declarations: [
    CampaignTemplatesComponent,
    TemplateFormComponent,
    CustomFormComponent
  ],
  imports: [
    SharedModule,
    CampaignsRoutingModule,
  ]
})
export class CampaignsModule { }
