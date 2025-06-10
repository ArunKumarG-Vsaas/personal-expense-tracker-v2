import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { LOCALSTORAGE_KEYS, MESSAGES, ROUTES } from '../config/common-config';
import { APIURL } from '../config/api-url-config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  async registerUser(userData: any) : Promise<any>{ 
    let apiReponse = await sendRequest(userData);
    return apiReponse;
    function sendRequest(value: any) {
      // value.operation = 'login'
      return new Promise(async (resolve, reject) => {
        try{
          let response = await fetch(`${APIURL}?sheet=Users&operation=add-user&sendEmail=true`,
            {
                method: 'POST',
                body: JSON.stringify(value),
            }
          );
          response = await response.json();
          resolve(response);
        }
        catch(error){
          resolve({
            status: 500,
            message: MESSAGES.ERROR.SERVER_ERROR
          });
        }
      })
    }
  }

  async loginUser(userData: any) : Promise<any>{ 
    let apiReponse = await sendRequest(userData);
    return apiReponse;
    function sendRequest(value: any) {
      value.operation = 'login'
      return new Promise(async (resolve, reject) => {
        try{
          let response = await fetch(`${APIURL}?sheet=Users&operation=login-user&sendEmail=true`,
            {
                method: 'POST',
                body: JSON.stringify(value),
            }
          );
          response = await response.json();
          resolve(response);
        }
        catch(error){
          resolve({
            status: 500,
            message: MESSAGES.ERROR.SERVER_ERROR
          });
        }
      })
    }
  }

  storeInLocal(key: string, value: string){
    localStorage.setItem(key,value);
  }

  getFromLocal(key: string){
    return localStorage.getItem(key);
  }

  isLoggedIn(): Boolean{
    return Boolean(localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN));
  }

  checkResponseStatus(apiReponse: any){
    if(apiReponse.status == 500){
      this._router.navigate([ROUTES.ERROR_PAGE], {
        queryParams: { code : 500 }
      });
      return EMPTY;
    }
    else if(apiReponse.status == 403){
      localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN);
      this._router.navigate([ROUTES.ERROR_PAGE], {
        queryParams: { code: 403 }
      })
    }
    else{
      return apiReponse;
    }
  }
}
