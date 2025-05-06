import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { LayoutModule } from "../layout/layout.module";
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ShowExpenseComponent } from './show-expense/show-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../shared/service/snackbar.service';

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
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule
  ],
  providers: [
    SnackbarService
  ]
})
export class ExpenseModule { }
