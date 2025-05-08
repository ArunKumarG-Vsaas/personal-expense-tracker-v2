import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './shared/config/common-config';
import { ExpenseModule } from './expense/expense.module';
import { ExpenseComponent } from './expense/expense/expense.component';
import { ErrorPageComponent } from './shared/component/error-page/error-page.component';
import { LoginCheckGuard } from './shared/guard/login-check.guard';

const routes: Routes = [
  {
    path: ROUTES.AUTH,
    canActivate: [LoginCheckGuard],
    loadChildren: () => import('../app/auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: '',
    redirectTo: ROUTES.AUTH,
    pathMatch: 'full'
  },
  {
    // Component added to show it as base module component, so that router outlet will work properly
    path: ROUTES.EXPENSE,
    component: ExpenseComponent,
    loadChildren: () => import('../app/expense/expense.module').then(module => module.ExpenseModule)
  },
  {
    path: ROUTES.ERROR_PAGE,
    component: ErrorPageComponent
  },
  // Wild card route:
  {
    path: "**",
    redirectTo: ROUTES.ERROR_PAGE + "?code=404",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
