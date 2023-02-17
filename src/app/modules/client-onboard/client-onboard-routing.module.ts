import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { OfficialDetailsComponent } from './official-details/official-details.component';
import { OnboardComponent } from './onboard/onboard.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { RateCardComponent } from './rate-card/rate-card.component';
import { SuccessfulOnboardingComponent } from './successful-onboarding/successful-onboarding.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboard',
    pathMatch: 'full',
  },
  {
    path: 'onboard',
    component: OnboardComponent,
  },
  {
    path: 'client-details',
    component: ClientDetailsComponent,
  },
  {
    path: 'official-details',
    component: OfficialDetailsComponent,
  },
  {
    path: 'plan-details',
    component: RateCardComponent,
  },
  {
    path: 'Onboarded',
    component: SuccessfulOnboardingComponent,
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
export class ClientOnboardRoutingModule {}
