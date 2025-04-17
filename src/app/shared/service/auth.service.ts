import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
      return new Promise(async (resolve, reject) => {
        let response = await fetch(`https://script.google.com/macros/s/AKfycbyeiN4vAoFL1w63ntvA-HxQjkU9M4qh5zZCrPRMnYssW9apvhSyzICwle1rfbFJfng/exec?sendEmail=true`,
          {
              method: 'POST',
              body: JSON.stringify(value)
          }
        );
        response = await response.json();
        resolve(response);
      })
    }
  }
}
