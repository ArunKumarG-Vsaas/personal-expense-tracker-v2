import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SIDEBAR } from 'src/app/shared/config/common-config';
import { SideBar } from 'src/app/shared/interface/interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() isDarkMode: EventEmitter<boolean> = new EventEmitter(false);
  @Output() sideBar: EventEmitter<boolean> = new EventEmitter(false);

  public darkTheme: boolean = false;
  public sideBarVal: boolean = false;
  public pageTitle: string = '';

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // On Load:
    this._manageSideBar(this._router.url);
    // While Changing
    this._router.events
      .pipe(filter((event:any) => event instanceof NavigationEnd))
      .subscribe(event => {
          this._manageSideBar(event.urlAfterRedirects);
    });
  }

  public changeTheme(val: boolean) {
    this.darkTheme = val;
    this.isDarkMode.emit(val);
  }

  public showSideBar(val: boolean){
    this.sideBar.emit(val);
  }

  private _manageSideBar(route: string){
    let sideBar: SideBar = this._getSideBar(route);
    this.pageTitle = sideBar.title;
    this._highlightSideBar(sideBar);
  }

  private _getSideBar(route: string){
    route = route.split('/')[2].trim();
    console.log(route)
    return SIDEBAR.find(sidebar => sidebar.path == route) || SIDEBAR[0];
  }

  private _highlightSideBar(sideBar: SideBar){
    sideBar.isActive = true;
    SIDEBAR.filter(i => i.path !== sideBar.path).forEach(j => j.isActive = false);
  }
}
