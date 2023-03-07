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
    path: '',
    redirectTo: 'employee-onboard',
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
  
  {
    path: 'employee-onboard',
    loadChildren: () =>
      import('./modules/employee-onboarding/emp-onboard.module').then((m) => m.EmpOnboardModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
