import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense/expense.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ROUTES, SIDEBAR } from '../shared/config/common-config';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ShowExpenseComponent } from './show-expense/show-expense.component';
import { RouteGuardGuard } from '../shared/guard/route-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.DASHBOARD,
    pathMatch: 'full'
  },
  {
    path: ROUTES.DASHBOARD,
    component: DashboardComponent,
    canActivate: [RouteGuardGuard]
  },
  {
    path: ROUTES.ADD_EXPENSE,
    component: AddExpenseComponent,
    canActivate: [RouteGuardGuard]
  },
  {
    path: ROUTES.LIST_EXPENSE,
    component: ShowExpenseComponent,
    canActivate: [RouteGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
