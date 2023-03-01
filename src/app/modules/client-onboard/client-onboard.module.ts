import { NgModule } from '@angular/core';

import { ClientOnboardRoutingModule } from './client-onboard-routing.module';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { OfficialDetailsComponent } from './official-details/official-details.component';
import { OnboardComponent } from './onboard/onboard.component';
import { RateCardComponent } from './rate-card/rate-card.component';
import { SuccessfulOnboardingComponent } from './successful-onboarding/successful-onboarding.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
     ClientDetailsComponent,
     OfficialDetailsComponent,
     OnboardComponent,
     RateCardComponent,
     SuccessfulOnboardingComponent,
     PasswordDialogComponent
  ],
  imports: [
    SharedModule,
    ClientOnboardRoutingModule,
    MatIconModule
  ]
})
export class ClientOnboardModule { }
