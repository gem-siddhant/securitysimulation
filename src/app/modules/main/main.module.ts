import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { MainRoutingModule } from './main-routing.module';
import { GiftComponent } from './gift/gift.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    GiftComponent,
    AddCampaignComponent,
    LoginComponent,
    DashboardComponent,
    CampaignViewComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    ChartsModule
  ]
})
export class MainModule { }
