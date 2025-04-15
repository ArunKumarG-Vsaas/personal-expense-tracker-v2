import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ROUTES } from '../shared/config/common-config';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: ROUTES.LOGIN,
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: ROUTES.LOGIN,
    pathMatch: 'full'
  },
  {
    path: ROUTES.REGISTER,
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
