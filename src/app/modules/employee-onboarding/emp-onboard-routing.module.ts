import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { EmpOnboardComponent } from './emp-onboard/emp-onboard.component';
import { OfficialDetailsComponent } from './official-details/official-details.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboard',
    pathMatch: 'full',
  },
  {
    path: 'onboardemp',
    component: EmpOnboardComponent,
  },
  {
    path: 'official-details',
    component: OfficialDetailsComponent,
  },
  {
    path: 'generate-password',
    component: PasswordDialogComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpOnboardRoutingModule {}
