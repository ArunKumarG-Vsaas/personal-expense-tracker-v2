import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HTMLLABEL, MESSAGES, ROUTES, SNACKBAR } from 'src/app/shared/config/common-config';
import { HtmlLabel, Message, Routes, Snackbar } from 'src/app/shared/interface/interface';
import { AuthService } from 'src/app/shared/service/auth.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-in', style({opacity: 1}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup;

  public htmlLabel : HtmlLabel = HTMLLABEL;
  public validationMessages: Message['ERROR'] = MESSAGES['ERROR'];
  public snackBarConfig: Snackbar = SNACKBAR;
  public routesConfig : Routes = ROUTES;

  public loadSpinner: boolean = false;
  

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBarService: SnackbarService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  public async loginUser(){
    if(this.loginForm.valid){
      this.loadSpinner = true
      let response = await this._authService.loginUser(this.loginForm.value);
      this.loadSpinner = false;
      if(response){
        this._snackBarService.showSnackBar(
          (response.status == 500) ? MESSAGES.ERROR.SERVER_ERROR : response.message,
          this.snackBarConfig.DELAY,
          (response.status < 400) ? this.snackBarConfig.SUCCESS : this.snackBarConfig.ERROR
        );
        if(response.status < 400) this._router.navigate([ROUTES.EXPENSE]);
      }
      else{
        this._snackBarService.showSnackBar(
          MESSAGES.ERROR.SERVER_ERROR,
          this.snackBarConfig.DELAY,
          this.snackBarConfig.ERROR
        )
      }
    }
    else{
      this.loadSpinner = false;
      this._snackBarService.showSnackBar(
        MESSAGES.ERROR.FILL_ALL,
        this.snackBarConfig.DELAY,
        this.snackBarConfig.ERROR
      )
    }
  }


  // Getters - to get the form controls from the template
  get email() {
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
