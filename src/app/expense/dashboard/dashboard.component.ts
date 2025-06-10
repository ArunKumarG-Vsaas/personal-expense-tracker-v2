import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { chartConfig, weekMonthGraphFilter, HTMLLABEL, chartType, modeCategoryFilter } from 'src/app/shared/config/common-config';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';
import { ExpenseService } from 'src/app/shared/service/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private _ngUnsubscribe: Subject<void> = new Subject();
  public htmlLabel: any = HTMLLABEL;
  public loadSpinner: boolean = false;
  public expenseData: any = {};

  constructor(
    private _expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this._loadExpenseData();
  }

  private _loadExpenseData(){
    this.loadSpinner = true;
    this._expenseService.getExpenseData()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe((expenseData: any) => {
        if(expenseData){
          this.loadSpinner = false;
          this.expenseData = expenseData;
          setTimeout(() => {
            this.createWeekMonthGraph(chartType[0],  weekMonthGraphFilter[0].option);
            this.createModeCategoryGraph(chartType[0], modeCategoryFilter[0].option)
          }, 50)
          console.log(expenseData);
        }
      })
  }

  public chartType: (keyof ChartTypeRegistry)[] = chartType;
  public weekMonthGraph: any;
  public weeklyMonthGraphFilter: any[] = weekMonthGraphFilter
  public weeklyMonthGraphFilterSelected: string = weekMonthGraphFilter[0].option;
  public weeklyMonthGraphTypeSelected: keyof ChartTypeRegistry = chartType[0];
  public createWeekMonthGraph(graphType: keyof ChartTypeRegistry, filter: string){
    if(this.weekMonthGraph) this.weekMonthGraph.destroy(); 

    this.weeklyMonthGraphFilterSelected = filter;
    this.weeklyMonthGraphTypeSelected = graphType;

    Chart.defaults.color = chartConfig.TEXT_COLOR;

    let yValues: any[] = [];
    let xValues: any[] = chartConfig.X_AXIS;

    if(filter == weekMonthGraphFilter[0].option){
      if(this.expenseData && this.expenseData.currentWeekExpenses && this.expenseData.currentWeekExpenses){
          xValues = chartConfig.X_AXIS;
          // const g =  this.expenseData.currentWeekExpenses.groupBy((expense: any) => new Date(expense.date).getDay());
          yValues = this._buildWeekData(this.expenseData.currentWeekExpenses)
      }
    }
    else if (filter == weekMonthGraphFilter[1].option) {
      if(this.expenseData && this.expenseData.previousWeekExpenses){
          xValues = chartConfig.X_AXIS;
          yValues = this._buildWeekData(this.expenseData.previousWeekExpenses);
      }
    }
    else {
      if(this.expenseData && this.expenseData.monthlyExpenses && this.expenseData.monthlyExpenses.length){
        xValues = chartConfig.X_AXIS_MONTH;
        yValues = this._buildMonthData(this.expenseData.monthlyExpenses);
      }
    }

    this.weekMonthGraph = new Chart("weekMonthGraph", {
      type: graphType,
      data: {
        // values on X-Axis
        labels: xValues,
      
	       datasets: [
          {
            label: chartConfig.BAR_LABEL,
            data: yValues,
            backgroundColor: chartConfig.BAR_COLOR,
            borderColor: chartConfig.BAR_COLOR,
            borderRadius: 2
          }
        ]
      },
      options: {
        aspectRatio:2.5,
      }
      
    });
  }

  public modeCategoryGraph: any;
  public modeCategoryGraphFilter: any[] = modeCategoryFilter;
  public modeCategoryGraphFilterSelected: string = weekMonthGraphFilter[0].option;
  public modeCategoryGraphTypeSelected: keyof ChartTypeRegistry = chartType[0];
  public createModeCategoryGraph(graphType: keyof ChartTypeRegistry, filter: string){
    if(this.modeCategoryGraph) this.modeCategoryGraph.destroy(); 

    this.modeCategoryGraphFilterSelected = filter;
    this.modeCategoryGraphTypeSelected = graphType;

    Chart.defaults.color = chartConfig.TEXT_COLOR;

    let yValues: any[] = [];
    let xValues: any[] = chartConfig.X_AXIS;

    if(filter == this.modeCategoryGraphFilter[0].option){
      if(this.expenseData && this.expenseData.filteredByMode){
        xValues = this.expenseData.filteredByMode.map((mode : any) => mode.mode);
        xValues.forEach(value => {
          yValues.push(this.expenseData.filteredByMode.find((mode: any) => mode.mode == value ).amount);
        })
      }
    }else{
      if(this.expenseData && this.expenseData.filteredByCategory){
        xValues = this.expenseData.filteredByCategory.map((category : any) => category.category);
        xValues.forEach(value => {
          yValues.push(this.expenseData.filteredByCategory.find((category: any) => category.category == value ).amount);
        })
      }
    }

    console.log(xValues);
    console.log(yValues);

    this.modeCategoryGraph = new Chart("modeCategoryGraph", {
      type: graphType,
      data: {
        // values on X-Axis
        labels: xValues,
      
	       datasets: [
          {
            label: chartConfig.BAR_LABEL,
            data: yValues,
            backgroundColor: chartConfig.BAR_COLOR,
            borderColor: chartConfig.BAR_COLOR,
            borderRadius: 2
          }
        ]
      },
      options: {
        aspectRatio:2.5,
      }
      
    });
  }

  private _buildWeekData(data:any){
    const filteredData : any[] = [];

    data.forEach((exp: any) => {
      const day = exp.date.split(" ")[0];

      const existing = filteredData.find(exp => exp.day == day);

      if(!existing){
        filteredData.push({
          day : day,
          amount : this._expenseService.roundAmountToTwoDecimals(exp.amount)
        })
      }
      else{
        existing.amount = this._expenseService.roundAmountToTwoDecimals(existing.amount + exp.amount) ;
      }
    })

    console.log(filteredData);

    const yValues: number[] = [0,0,0,0,0,0,0];
    filteredData.forEach((exp:any) => {
      yValues[chartConfig.X_AXIS.indexOf(exp.day)] = exp.amount;
    });
    return yValues;
  }

  private _buildMonthData(data: any){
    const yValues: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    data.forEach((exp:any) => {
      yValues[chartConfig.X_AXIS_MONTH.indexOf(exp.month)] = exp.amount;
    });
    return yValues;
  }

}
