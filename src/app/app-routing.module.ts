import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './shared/config/common-config';

const routes: Routes = [
  {
    path: ROUTES.LOGIN,
    loadChildren: () => import('../app/auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: '',
    redirectTo: ROUTES.LOGIN,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
