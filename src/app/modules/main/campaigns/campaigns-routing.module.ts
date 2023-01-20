import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { CampaignTemplatesComponent } from './campaign-templates/campaign-templates.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'templates',
    pathMatch: 'full',
  },
  {
    path: 'templates',
    canActivate: [AuthGuard],
    component: CampaignTemplatesComponent,
  },
  {
    path : 'template-form/:id',
    canActivate: [AuthGuard],
    component: TemplateFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignsRoutingModule {}
