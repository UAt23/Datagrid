import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this.isSidebarOpenSubject.asObservable();

  getSidebarOpenStatus() : Observable<boolean> { return this.isSidebarOpen$ }

  toggleSidebar() {
    console.log(this.isSidebarOpenSubject.value);
    this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
  }
}
