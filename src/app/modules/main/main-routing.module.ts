import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftComponent } from './gift/gift.component';

const routes: Routes = [{
  path:'gifts',
  component: GiftComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
