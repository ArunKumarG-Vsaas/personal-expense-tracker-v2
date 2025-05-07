import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/shared/service/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
  }

}
