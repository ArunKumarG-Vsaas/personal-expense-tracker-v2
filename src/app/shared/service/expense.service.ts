import { Injectable } from '@angular/core';
import { APIURL } from '../config/api-url-config';
import { LOCALSTORAGE_KEYS, MESSAGES, SHEET_NAMES } from '../config/common-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private _sharedData$: BehaviorSubject<any> = new BehaviorSubject(null);
  private _sharedData: Observable<any> = this._sharedData$.asObservable();

  private _expenseData$: BehaviorSubject<any> = new BehaviorSubject(null);
  private _expenseData: Observable<any> = this._expenseData$.asObservable();

  constructor(
    private _authService: AuthService
  ) { }

  // Load category and mode options for addExpense form and store in the shareddata behavior subject
  async loadSharedData(){
    let categoryOptions = await this._getDataFromSheet(SHEET_NAMES.CATEGORY, "get-all");
    categoryOptions = categoryOptions.data;

    let modeOptions = await this._getDataFromSheet(SHEET_NAMES.MODE, "get-all");
    modeOptions = modeOptions.data;

    this._sharedData$.next({
      categoryOptions,
      modeOptions
    });
  }

  async loadExpenseData(){
    let expenseData = await this._getDataFromSheet(SHEET_NAMES.EXPENSE, "get-expense");
    this._expenseData$.next(expenseData.data || {});
  }

  private async _getDataFromSheet(sheetName: string, operation: string): Promise<any>{
    let apiReponse : any = await sendRequest();
    return this._authService.checkResponseStatus(apiReponse);
    
        function sendRequest() {
          return new Promise(async (resolve, reject) => {
            try{
              let response = await fetch(APIURL + `?sheet=${sheetName}&operation=${operation}&token=${localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN)}`);
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

  public async addExpense(expenseData: any): Promise<any>{
    expenseData.token = this._authService.getFromLocal(LOCALSTORAGE_KEYS.TOKEN);
    let apiReponse : any = await sendRequest();
    console.log(apiReponse);
    return this._authService.checkResponseStatus(apiReponse);
    
        function sendRequest() {
          return new Promise(async (resolve, reject) => {
            try{
              let response = await fetch(`${APIURL}?sheet=expense&operation=create-expense`,
                {
                  method: 'POST',
                  body: JSON.stringify(expenseData)
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

  public getSharedData(){
    return this._sharedData;
  }

  public getExpenseData(){
    return this._expenseData;
  }

  public roundAmountToTwoDecimals(amount : any): string{
    return parseFloat(amount).toFixed(2);
  }
}
