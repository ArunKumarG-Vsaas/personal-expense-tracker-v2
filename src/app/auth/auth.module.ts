import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar'
import { SpinnerComponent } from '../shared/component/spinner/spinner.component';
import { SnackbarService } from '../shared/service/snackbar.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    MatSnackBarModule
  ],
  providers: [
    SnackbarService
  ]
})
export class AuthModule { }
