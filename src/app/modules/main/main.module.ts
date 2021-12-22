import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MainRoutingModule } from './main-routing.module';
import { GiftComponent } from './gift/gift.component';


@NgModule({
  declarations: [
    GiftComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule
  ]
})
export class MainModule { }
