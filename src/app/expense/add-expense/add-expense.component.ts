import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HTMLLABEL, MESSAGES, SNACKBAR, VALIDATION_REGEX } from 'src/app/shared/config/common-config';
import { HtmlLabel, Message, Snackbar } from 'src/app/shared/interface/interface';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddExpenseComponent implements OnInit {
  public htmlLabel : HtmlLabel = HTMLLABEL
  public validationMessages: any = MESSAGES.ERROR;
  public today: any = new Date();
  public addExpenseForm! : FormGroup
  public snackBarConfig: Snackbar = SNACKBAR;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.addExpenseForm = this._formBuilder.group({
      expense : ['', [Validators.required, expenseNameCheck()]],
      amount: ['', [Validators.required, amountCheck()]],
      category: ['',[Validators.required]],
      mode: ['',[Validators.required]],
      date: ['', [Validators.required]],
      note: ['']
    })
  }

  addExpense(){
    if(this.addExpenseForm.valid){
      this._snackBarService.showSnackBar(
        "Expense Created",
        this.snackBarConfig.DELAY,
        this.snackBarConfig.SUCCESS
      );
    }
    else{
      this._snackBarService.showSnackBar(
        MESSAGES.ERROR.FILL_ALL,
        this.snackBarConfig.DELAY,
        this.snackBarConfig.ERROR
      );
    }
  }

  // Getters:
  get expense(){
    return this.addExpenseForm.get('expense');
  }

  get amount(){
    return this.addExpenseForm.get('amount');
  }

  get mode(){
    return this.addExpenseForm.get('mode');
  }

  get category(){
    return this.addExpenseForm.get('category');
  }

  get date(){
    return this.addExpenseForm.get('date');
  }
}


export function expenseNameCheck(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;
    if (value && value.trim().length > 0) {
      let letters: any[] = value.match(/\w/g);
      return (!letters || letters.length < 3) ? { invalidName: true } : null;
    }
    return (value && value.trim().length == 0) ? { invalidName: true } : null;
  }
}

export function amountCheck(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;
    if (value && value.length) {
      return VALIDATION_REGEX.AMOUNT_REGEX.test(value) ? null : { invalidAmount: true };
    }
    return null;
  }
}