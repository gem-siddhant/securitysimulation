import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'misapprasial-login',
    loadChildren: () =>
      import('./modules/main/gift/gift.module').then((m) => m.giftModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
