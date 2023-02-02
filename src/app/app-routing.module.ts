import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'client-onboard',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },

  {
    path: 'client-onboard',
    loadChildren: () =>
      import('./modules/client-onboard/client-onboard.module').then((m) => m.ClientOnboardModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
