import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ERROR_PAGE, ROUTES } from '../../config/common-config';
import { ErrorData } from '../../interface/interface';
import { Location } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  public errorData: ErrorData = ERROR_PAGE.INTERNAL_SERVER_ERROR;
  public loadSpinner: boolean = false;
  public isDarkTheme: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _atuhService: AuthService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      if(params['code'] == 403){
        this.errorData = ERROR_PAGE.FORBIDDEN;
      }
      else if(params['code'] == 404){
        this.errorData = ERROR_PAGE.PAGE_NOT_FOUND;
      }
      else if(params['code'] == 500){
        this.errorData = ERROR_PAGE.INTERNAL_SERVER_ERROR;
      }
      else{
        this.errorData = ERROR_PAGE.PAGE_NOT_FOUND;
      }
    })
  }

  retry(errorCode: String){
    this.loadSpinner = true;
    if(errorCode == '500'){
      setTimeout(() => {
        this.loadSpinner = false
        if(this._atuhService.isLoggedIn()){
          this._router.navigate([ROUTES.EXPENSE,ROUTES.DASHBOARD]);
        }
        else{
          this._router.navigate([ROUTES.AUTH, ROUTES.LOGIN]);
        }
      }, 1000)
    }
    else if(errorCode == '404'){
      setTimeout(() => {
        this.loadSpinner = false;
        this._location.back();
      }, 1000)
      
    }
    else{
      this.loadSpinner = false;
      this._router.navigate([ROUTES.AUTH, ROUTES.LOGIN])
    }
  }

}
