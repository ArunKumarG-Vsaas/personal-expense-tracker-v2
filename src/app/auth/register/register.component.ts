import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HTMLLABEL, MESSAGES, ROUTES, SNACKBAR, VALIDATION_LIMIT, VALIDATION_REGEX } from 'src/app/shared/config/common-config';
import { HtmlLabel, Message, Routes, Snackbar } from 'src/app/shared/interface/interface';
import { AuthService } from 'src/app/shared/service/auth.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  public htmlLabel : HtmlLabel = HTMLLABEL;
  public validationMessages: Message['ERROR'] = MESSAGES['ERROR'];
  public snackBarConfig: Snackbar = SNACKBAR;
  public routesConfig : Routes = ROUTES;
  public loadSpinner: boolean = false;
  public validationRegex: any = VALIDATION_REGEX

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBarService: SnackbarService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.validationRegex.NAME_REGEX)]],
      lastName: ['', [Validators.required, Validators.pattern(this.validationRegex.NAME_REGEX)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',  [Validators.required, Validators.minLength(VALIDATION_LIMIT.PASSWORD_MIN_LENGTH), Validators.maxLength(VALIDATION_LIMIT.PASSWORD_MAX_LENGTH), passwordStrengthCheck() ]]
    })
  }

  public async createUser() {
    if(this.registerForm.valid){
      this.loadSpinner = true
      // console.log(this.registerForm.value)
      let response = await this._authService.registerUser(this.registerForm.value);
      if(response){
        this._snackBarService.showSnackBar(
          response.message,
          this.snackBarConfig.DELAY,
          (response.status < 400) ? this.snackBarConfig.SUCCESS : this.snackBarConfig.ERROR
        )
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
      this._snackBarService.showSnackBar(
        MESSAGES.ERROR.FILL_ALL,
        this.snackBarConfig.DELAY,
        this.snackBarConfig.ERROR
      )
    }
    this.loadSpinner = false;
  }

  // Getters:
  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

}


export function passwordStrengthCheck(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    let value = control.value;
    if(value && value.length >= VALIDATION_LIMIT.PASSWORD_MIN_LENGTH && value.length <= VALIDATION_LIMIT.PASSWORD_MAX_LENGTH){
      
    const hasNumbers = /\d+/.test(value);

    value = value.replaceAll(/\w/g,"");
    value = value.replaceAll(/\d/g,"");

    const hasSpecialCharacters = value.length > 0;
    return (!hasNumbers || !hasSpecialCharacters)? { invalidPassword: true } : null;
    }
    return null;
  } 
}