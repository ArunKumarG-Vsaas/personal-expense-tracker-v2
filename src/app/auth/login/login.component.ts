import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTMLLABEL, MESSAGES, ROUTES, SNACKBAR } from 'src/app/shared/config/common-config';
import { HtmlLabel, Message, Routes, Snackbar } from 'src/app/shared/interface/interface';
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
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  public loginUser(){
    if(this.loginForm.valid){
      this.loadSpinner = true
    }
    else{
      this._snackBarService.showSnackBar(
        "asa",
        this.snackBarConfig.DELAY,
        this.snackBarConfig.SUCCESS
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
