import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';

const routes: Routes = [{
  path: '',
  loadChildren: () =>
    import('./modules/main/main.module').then((m) => m.MainModule)
},{
  path: 'main',
  loadChildren: () =>
    import('./modules/main/main.module').then((m) => m.MainModule)
},
{
  path:'delete',
  component:DeleteModalComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
