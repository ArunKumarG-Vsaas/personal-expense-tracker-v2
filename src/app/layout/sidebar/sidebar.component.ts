import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { HTMLLABEL, ROUTES, SIDEBAR } from 'src/app/shared/config/common-config';
import { SideBar } from 'src/app/shared/interface/interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // when component or element enters
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [ // when it leaves (removed or hidden)
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @Output() sideBarClose: EventEmitter<boolean> = new EventEmitter(false);
  @HostBinding('@fadeInOut') animation = true;

  public htmlLabel: any = HTMLLABEL

  public sideBarItems: SideBar[] = SIDEBAR;

   

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  closeSideBar(){
    this.sideBarClose.emit(true);
  }

  public gotoLocation(sideBar: SideBar){
    this._router.navigate([ROUTES.EXPENSE ,sideBar.path]);
    this.sideBarClose.emit(true);
  }
}
