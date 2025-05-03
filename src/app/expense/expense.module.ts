import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { LayoutModule } from "../layout/layout.module";
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ShowExpenseComponent } from './show-expense/show-expense.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ExpenseComponent,
    AddExpenseComponent,
    ShowExpenseComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    LayoutModule
]
})
export class ExpenseModule { }
