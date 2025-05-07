import { Injectable } from '@angular/core';
import { APIURLS } from '../config/api-url-config';
import { MESSAGES, SHEET_NAMES } from '../config/common-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private _sharedData$: BehaviorSubject<any> = new BehaviorSubject(null);
  private _sharedData: Observable<any> = this._sharedData$.asObservable();

  constructor(
    private _authService: AuthService
  ) { }

  // Load category and mode options for addExpense form and store in the shareddata behavior subject
  async loadSharedData(){
    let categoryOptions = await this._getDataFromSheet(SHEET_NAMES.CATEGORY);
    categoryOptions = categoryOptions.data;

    let modeOptions = await this._getDataFromSheet(SHEET_NAMES.MODE);
    modeOptions = modeOptions.data;

    this._sharedData$.next({
      categoryOptions,
      modeOptions
    });
  }

  private async _getDataFromSheet(sheetName: String): Promise<any>{
    let apiReponse : any = await sendRequest(sheetName);
    return this._authService.checkResponseStatus(apiReponse);
    
        function sendRequest(value: any) {
          return new Promise(async (resolve, reject) => {
            try{
              let response = await fetch(APIURLS.GET_FROM_SHEET + `?sheet=${sheetName}`);
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

  public getSharedData(){
    return this._sharedData;
  }
}
