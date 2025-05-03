import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  public changeDarkTheme: boolean = false;
  public enableSideBar: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  public changeTheme(value: boolean){
    this.changeDarkTheme = value;
  }

  public showSideBar(value: boolean){
    this.enableSideBar = value
  }

  public closeSideBar(value: boolean){
    this.enableSideBar = !value;
  }


}
