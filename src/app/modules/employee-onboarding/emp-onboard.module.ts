import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { EmpOnboardRoutingModule } from './emp-onboard-routing.module';
import { EmpOnboardComponent } from './emp-onboard/emp-onboard.component';
import { OfficialDetailsComponent } from './official-details/official-details.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
@NgModule({
  declarations: [
     EmpOnboardComponent,
     PasswordDialogComponent,
     OfficialDetailsComponent

  ],
  imports: [
    SharedModule,
    EmpOnboardRoutingModule
  ]
})
export class EmpOnboardModule { }
