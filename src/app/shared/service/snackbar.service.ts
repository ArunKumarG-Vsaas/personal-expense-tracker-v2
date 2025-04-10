import { Injectable } from '@angular/core';
import { MatSnackBar }  from '@angular/material/snack-bar'
import { SnackbarComponent } from '../component/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _matSnackBar: MatSnackBar
  ) { }

  public showSnackBar(message: string, duration? : number, status? : string){
    if (message) {
      this._matSnackBar.openFromComponent(SnackbarComponent, {
        data: message,
        panelClass: status,
        duration: (duration ? duration : 2000),
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
    }
  }
}
