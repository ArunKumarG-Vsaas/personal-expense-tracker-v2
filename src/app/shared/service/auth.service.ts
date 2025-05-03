import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MESSAGES } from '../config/common-config';
import { APIURLS } from '../config/api-url-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  public async registerUser(userData: any) : Promise<any>{ 
    let apiReponse = await sendRequest(userData);
    return apiReponse;
    function sendRequest(value: any) {
      // value.operation = 'login'
      return new Promise(async (resolve, reject) => {
        try{
          let response = await fetch(`${APIURLS.USER}?sendEmail=true`,
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


  public async loginUser(userData: any) : Promise<any>{ 
    let apiReponse = await sendRequest(userData);
    return apiReponse;
    function sendRequest(value: any) {
      value.operation = 'login'
      return new Promise(async (resolve, reject) => {
        try{
          let response = await fetch(APIURLS.USER,
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
}
