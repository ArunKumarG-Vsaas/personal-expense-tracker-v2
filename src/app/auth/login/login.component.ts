import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTMLLABEL, MESSAGES } from 'src/app/shared/config/common-config';
import { HtmlLabel, Message } from 'src/app/shared/interface/interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup;

  public htmlLabel : HtmlLabel = HTMLLABEL;
  public validationMessages: Message['ERROR'] = MESSAGES['ERROR'];
  

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  public loginUser(){

  }


  // Getters - to get the form controls from the template
  get email() {
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
