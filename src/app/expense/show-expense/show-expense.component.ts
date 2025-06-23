import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TableViewInput } from 'src/app/shared/interface/interface';
import { ExpenseService } from 'src/app/shared/service/expense.service';

@Component({
  selector: 'app-show-expense',
  templateUrl: './show-expense.component.html',
  styleUrls: ['./show-expense.component.css']
})
export class ShowExpenseComponent implements OnInit {
  private _ngUnsubscribe: Subject<void> = new Subject();
  public isLoading: boolean = false;

  public expenseData$: BehaviorSubject<TableViewInput | null> = new BehaviorSubject<any>(null);

  constructor(
    private _expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._expenseService.getExpenseData()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe((data:any) => {
        if(data){
          this.expenseData$.next({
          tableData: data.allExpenses,
          title: "All Expenses",
          options: {
            isCustomColumn: false,
            canSearchAnDownload: true,
            canSort: true,
            limit: 10
          }
        })
        this.isLoading = false;
        }
      })
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
