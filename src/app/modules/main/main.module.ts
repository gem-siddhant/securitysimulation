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

@NgModule({
  declarations: [
    GiftComponent,
    AddCampaignComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MainModule { }
