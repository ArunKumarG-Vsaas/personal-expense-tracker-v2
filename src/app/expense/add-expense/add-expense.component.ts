import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HTMLLABEL, MESSAGES, SNACKBAR, VALIDATION_REGEX } from 'src/app/shared/config/common-config';
import { HtmlLabel, Message, Snackbar } from 'src/app/shared/interface/interface';
import { ExpenseService } from 'src/app/shared/service/expense.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({opacity: 1}))
      ])
    ])
  ]
})
export class AddExpenseComponent implements OnInit {
  private _ngUnsubscribe: Subject<void> = new Subject();
  public htmlLabel : HtmlLabel = HTMLLABEL
  public validationMessages: any = MESSAGES.ERROR;
  public today: any = new Date();
  public addExpenseForm! : FormGroup
  public snackBarConfig: Snackbar = SNACKBAR;
  public loadSpinner: boolean = false;
  public categoryOptions: any[] = [];
  public modeOptions: any[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBarService: SnackbarService,
    private _expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.addExpenseForm = this._formBuilder.group({
      expense : ['', [Validators.required, expenseNameCheck()]],
      amount: ['', [Validators.required, amountCheck()]],
      category: ['',[Validators.required]],
      mode: ['',[Validators.required]],
      date: ['', [Validators.required]],
      note: ['']
    });
    this._loadSharedData();
  }

  // Subscribing the sharedData observable to get mode and category options
  private async _loadSharedData(){
    this.loadSpinner = true;
    this._expenseService.getSharedData()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe((sharedData : any) => {
        if(sharedData){
          this.categoryOptions = sharedData['categoryOptions'] || [];
          this.modeOptions = sharedData['modeOptions'] || [];
          this.loadSpinner = false;
        }
      })
  }

  async addExpense(){
    if(this.addExpenseForm.valid){
      this.loadSpinner = true;
      const expenseData = this.addExpenseForm.value;
      expenseData.category = this.categoryOptions.find(option => option.id == expenseData.category).name;
      expenseData.mode = this.modeOptions.find(option => option.id == expenseData.mode).name;
      expenseData.date = new Date(expenseData.date).toDateString();
      let response = await this._expenseService.addExpense(this.addExpenseForm.value);
      if(response){
        this._snackBarService.showSnackBar(
          (response.status == 500) ? MESSAGES.ERROR.SERVER_ERROR : response.message,
          this.snackBarConfig.DELAY,
          (response.status < 400) ? this.snackBarConfig.SUCCESS : this.snackBarConfig.ERROR
        );

        if(response.status == 201) this.addExpenseForm.reset();
      }
      else{
        this._snackBarService.showSnackBar(
          MESSAGES.ERROR.SERVER_ERROR,
          this.snackBarConfig.DELAY,
          this.snackBarConfig.ERROR
        )
      }
      this.loadSpinner = false;
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

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
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