import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { HTMLLABEL } from '../../config/common-config';
import { HtmlLabel, TableViewInput } from '../../interface/interface';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  /**
   * Input:
   *  {
   * title: ""
    * tableData: []
    *   options : {
    *      canSort: true or false,
    *      canSearchAnDownload: true or false
    *   }
   *  }
   */
  @Input() inputData$ : Observable<TableViewInput | null> = new Observable<any>();
  private _ngUnsubscribe: Subject<void> = new Subject();
  public htmlLabel: HtmlLabel = HTMLLABEL;

  public customColumns: any[] = [];
  public tableData: any[] = [];
  public title: string = ""

  constructor() { }

  ngOnInit(): void {
    this.inputData$
    .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
    .subscribe(data => {
      if(data){
        this.title = data.title
        this.customColumns = (data.options.isCustomColumn) ? Object.keys(data.tableData[0]) : [];
        this.tableData = data.tableData;
        console.log(this.customColumns)
      }
    })
  }

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();

  }


}
